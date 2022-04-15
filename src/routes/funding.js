const express = require('express');
const auth = require("../middlware/authserver")
const postcnt = require("../controllers/funding")
const multer = require('multer')

const router = new express.Router()

router.get("/getallpost",postcnt.getallpost)

const uplode  = multer({
    dest: 'image'
})

router.post("/Addpost",auth,postcnt.addpost)

router.post("/Fileupload",uplode.single('upload'),auth,postcnt.imgupload)

router.get("/delpost/:id",auth,postcnt.deletepost)

router.get("/getpostbytopic/:topic",postcnt.getpostbytopic)

router.get("/getpost/:id",postcnt.getpost)

module.exports = router