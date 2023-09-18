const express = require('express')

const router = express.Router()
const{createuser,login} =require("../controller/userController")

router.post("/",createuser)
router.post("/login",login)

module.exports = router