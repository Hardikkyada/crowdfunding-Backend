const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000

const mongoose = require('mongoose')
const cors = require('cors');

mongoose.connect("mongodb+srv://hardik:1234@cluster0.pocze.mongodb.net/CROWDFUNDING?retryWrites=true&w=majority").then(() => {
    console.log("connected mongodb");
})

const corsOpts = {
    origin: '*',

    methods: ['GET', 'POST', 'DELETE', 'PATCH'],

    allowedHeaders: '*',
};

app.use(cors(corsOpts));
app.use(express.json())

app.use(express.static('public')); 
app.use('/image', express.static('image'));


const userrouter = require("./src/routes/user")
const fundingrouter = require("./src/routes/funding")
const fundrouter = require("./src/routes/Fund")
const topicrouter = require("./src/routes/topic")

app.use(userrouter)
app.use(fundrouter)
app.use(fundingrouter)
app.use(topicrouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
