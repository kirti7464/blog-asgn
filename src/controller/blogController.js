const { isValidObjectId } = require("mongoose")
const{User_Model}=require("../models/userModel")
const{Blogs_Model}=require("../models/blogModel")

const creatingBlog= async(req,res)=>{
   try {
      let data=req.body
    const {title,body,userId,category} =req.body
    if(!title) return res.status(400).send("title not found")
    if(!body) return res.status(400).send("body not found")
    if(!userId) return res.status(400).send("userId not found")
    if(!category) return res.status(400).send("category not found")
    if (isValidObjectId(userId)) {
      const validId = await User_Model.findById(userId);
      if (!validId) {
        return res
          .status(401)
          .send({ status: false, message: " userId not found" });
      } else {
        let createData = await Blogs_Model.create(data);
        return res.status(201).send({ status: true, data: createData });
      }
    } else
      return res
        .status(400)
        .send({ statue: false, message: "userId not valid " });
      
   } catch (error) {
      return res.status(500).send({staus:false,message:"unable to create blog",error:error.message})
   }
}
const getBlog = async function(req,res){
    
    let {tags,authorId,category,comment }=req.query 
    const filter = {};
    
    if (authorId) {
      if(isValidObjectId(authorId)){
      filter.authorId = authorId;}
      else { return res.status(200).send({status:false,message:"no blog of this Author"})}
    }

    if (category) {
      filter.category = category;
    }

    if (tags) {
      filter.tags = tags; 
    }

    if (comment) {
      filter.comment = comment;
    }
    let blogData= await Blogs_Model.find(filter,{isDeleted:false},{isPublished:true});
    if(blogData.length>0){
        res.status(200).send({status:true,message:"Blogs list",data:blogData})
    }else{
        res.status(404).send({status:false,message:"No blogs with applied filters"})
    }
}
const updateBlog = async(req,res) =>{
    try{
        let blogId = req.params.blogId
        if(isValidObjectId(blogId)){
        let data = req.body
        let blog = await Blogs_Model.findById(blogId)
        if(!blog)return res.status(404).send("Blog Not Found")
        let time = new Date()
        let update = await Blogs_Model.findOneAndUpdate(
            {$and : [{_id : blogId} , {isDeleted : false}] } ,
            {$set : data,isPublish:true,publishedAt:time } ,
            {new : true}
            )
       return res.status(200).send({status : true , message : "Blog updated successfully" , data : update})}
        else return res.status(400).send("object id is not valid")
       
        
        
    }catch(error) {res.status(500).send({error:"Internal Server Error"})}
}
 
const deletedBlogByParams = async (req,res)=>{
    try {
       let blogId = req.params.blogId
       if(isValidObjectId(blogId)==false) return res.status(400).send({status:false,message:"Object Id is not valid"})
        let blog = await Blogs_Model.findById(blogId)
        if(!blog){ return res.status(404).send({status:false,message:"Id data is not present"})  }
        let deletedBlog=await Blogs_Model.findOne({_id:blogId,isDeleted:true})
        if(deletedBlog){return res.status(404).send("Already deleted...")}
        let newBlogData= await Blogs_Model.findByIdAndUpdate(blogId,{$set:{isDeleted:true,deletedAt:new Date()}},{new:true}) 
       res.status(200).send({status:true,message:`deleted succesfully..`})
       
    } catch (error) {
       res.status(500).send({staus:false,message:"error in deletion"})
       
    }
 }
module.exports={creatingBlog,getBlog,deletedBlogByParams,updateBlog}