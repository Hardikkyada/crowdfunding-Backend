const express = require('express')

const router = new express.Router()

const usercnt = require("../controllers/user");
const  auth  = require("../middlware/authserver");  


router.get('/test',(req,res)=> {
    res.send('Hello Roter!');
})

router.post('/login',usercnt.login);

router.post('/reg', usercnt.reg)

router.get('/list' ,usercnt.userlist)

router.get('/logout', usercnt.logout)

module.exports = router