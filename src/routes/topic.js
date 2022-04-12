const express = require('express');
const auth = require("../middlware/authserver")
const topiccnt = require("../controllers/topic")

const router = new express.Router()


router.get('/testtopic',(req,res)=>{
    res.send('Hello Roter! topic');
})

const topicdata = require("../model/topic");


router.get("/getalltopic",topiccnt.getalltopic)

router.post("/AddTopic",auth,topiccnt.addtopic)

module.exports = router