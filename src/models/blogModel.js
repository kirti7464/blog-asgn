const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    },
    body : {
        type : String , 
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User_Model"
    },
    tags : {
        type : [String]
    },
    category : {
        type : String , 
        required : true
    },
    comment : {  
        type : [String]
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted : { 
        type : Boolean ,
        default : false
    },
    publishedAt : {
        type : Date ,
        default : null
    },
    isPublished : {
        type : Boolean ,
        default : false
    }
},{timestamps:true})

const Blogs_Model= new mongoose .model("Blogs_Model",blogsSchema)
module.exports={Blogs_Model}