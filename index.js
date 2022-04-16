const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT

const mongoose = require('mongoose')

app.use(express.json())

app.use(express.static('public')); 
app.use('/image', express.static('image'));

mongoose.connect("mongodb://127.0.0.1:27017/CROWDFUNDING").then(()=>{
    console.log("connected mongodb");
})

const userrouter = require("./src/routes/user")
const fundingrouter = require("./src/routes/funding")
const fundrouter = require("./src/routes/Fund")
const topicrouter = require("./src/routes/topic")



app.use(userrouter)
app.use(fundrouter)
app.use(fundingrouter)
app.use(topicrouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
