const express = require('express')
const app = express()
const blogRoute = require('./routes/blogRoute')
const userRoute = require('./routes/userRoute')
const mongoose = require('mongoose')
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGOCONNECT).then(()=>console.log("mongoose is connected"))
.catch((e)=>{console.log("mongoose is not connected")})


app.use('/blogs',blogRoute)
app.use('/user',userRoute)

app.listen( 5000 ,function(){
    console.log(`THe server is running on port ${process.env.PORT}`)
})