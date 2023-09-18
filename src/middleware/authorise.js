const {Blogs_Model}=require("../models/blogModel")

const   authorise = async(req, res, next)=> {
  try {
     let userId=req.head
    let blogId = req.params.blogId;
    let blog=await Blogs_Model.findById(blogId)
    console.log(userId)
    if(userId!=blog.userId)return res.status(401).send({status:false, message:"not valid User"});
    next() 
} catch (er) {
    return res.status(403).send({status:false, message:"Not authorised"});
  }
};

module.exports={authorise}