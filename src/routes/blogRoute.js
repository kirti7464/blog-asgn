const express = require('express')
const router = express.Router()

const{creatingBlog,deletedBlogByParams,getBlog,updateBlog}=require("../controller/blogController")
const {tokenCheck} = require("../middleware/authenticate")
const {authorise} = require("../middleware/authorise")

router.post("/",tokenCheck ,creatingBlog)
router.delete("/:blogId",tokenCheck, authorise ,deletedBlogByParams)
router.get("/",tokenCheck,getBlog)
router.put("/:blogId",tokenCheck,authorise,updateBlog)

module.exports = router