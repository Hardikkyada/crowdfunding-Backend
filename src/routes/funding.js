const express = require('express');
const auth = require("../middlware/authserver")
const postcnt = require("../controllers/funding")

const router = new express.Router()

router.get("/getallpost",postcnt.getallpost)

router.post("/Addpost",auth,postcnt.addpost)

router.get("/delpost/:id",auth,postcnt.deletepost)

router.get("/getpostbytopic/:topic",postcnt.getpostbytopic)

router.get("/getpost/:id",postcnt.getpost)

module.exports = router