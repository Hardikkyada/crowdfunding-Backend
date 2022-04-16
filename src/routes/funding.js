const express = require('express');
const auth = require("../middlware/authserver")
const postcnt = require("../controllers/funding")
const multer = require('multer')

const router = new express.Router()

router.get("/getallpost",postcnt.getallpost)


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+file.originalname)
    }
})

var upload = multer({ storage: storage })


router.post("/Addpost",auth,postcnt.addpost)

router.post("/Fileupload",upload.single('upload'),auth,postcnt.imgupload)

router.get("/delpost/:id",auth,postcnt.deletepost)

router.get("/getpostbytopic/:topic",postcnt.getpostbytopic)

router.get("/getpost/:id",postcnt.getpost)

router.get("/dayleft/:id",postcnt.leftday)

module.exports = router