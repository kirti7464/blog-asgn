const {User_Model}=require("../models/userModel")
const {hassPassWord}=require("../util/bcrypt")
const { comparePassword } =require("../util/bcrypt")
var jwt = require('jsonwebtoken');

//create
const createuser=async (req,res)=>{

     try { const data=req.body;
          const{fname,lname,title,email ,password }=data
          if(!fname) return res.status(400).send("fname not found")
          if(!lname) return res.status(400).send("lname not found")
          if(!title) return res.status(400).send("title not found")
          if(!email) return res.status(400).send("email not found")
          if(!password) return res.status(400).send("password not found")

          if(!fname.match(/^([(A-Z)(a-z)]+$)/i)){
               return res.status(400).send("please enter valid fname")
          }
          if(!lname.match(/^([(A-Z)()(a-z)]+$)/i)){
               return res.status(400).send("please enter valid lname")
          }
          
          if(!email.match(/^([...(a-z)\.)(0-9)+@([/a-z/]+\.(com|in|org)$)/gi)){
               return res.status(400).send("email format is invalid ")
          }
           const hasspassword=await hassPassWord(password)
          let user=await User_Model.findOne({email:email})
          if(user) return res.status(409).send("email already exist")
          let create= await User_Model.create({fname,lname,title,email ,password:hasspassword })
          res.status(201).send({status:true,data:create})
          
     } catch (error) {
          res.status(500).send({status:false,message:"error in Creating user"})
          
     }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email) return res.status(400).send({status:"false",message:"email needed"})
        if(!password) return res.status(400).send({status:"false",message:"password needed"})
        const author=await User_Model.findOne({email})
        if(!author) return res.status(401).send({status:"false",message:"email is not registered"})
        const passwordStatus=await comparePassword(password,author.password)
        if(!passwordStatus) return res.status(401).send({status:"false",message:"password does not Match Try Again."})
        const token=jwt.sign({id:author._id},process.env.SECRETKEY,{expiresIn:"1d"})
        res.setHeader("x-api-key",token)
        
        res.status(200).send({status:"true",message:"login success",token})
        
    } catch (error) {
        res.status(500).send({status:false , message:error.message})
        
    }
}
module.exports={createuser,login}