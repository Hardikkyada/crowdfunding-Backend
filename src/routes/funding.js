const express = require('express');
const auth = require("../middlware/authserver")
const postcnt = require("../controllers/funding")

const upload = require("../middlware/Uplodefile")

const router = new express.Router()

router.get("/getallpost",postcnt.getallpost)

// router.post("/Addpost",[auth,upload.single('upload')],postcnt.addpost)
router.post("/Addpost",auth,postcnt.addpost)

router.patch("/Editpost/:id",[auth,upload.single('upload')],postcnt.editpost)

router.post("/Fileupload",[auth,upload.single('upload')],postcnt.imgupload)

router.delete("/delpost/:id",auth,postcnt.deletepost)

router.get("/getpostbytopic/:topic",postcnt.getpostbytopic)

router.get("/getpost/:id",postcnt.getpost)

router.get("/getpostbyuser/:id",postcnt.getpostbyuser)

router.get("/dayleft/:id",postcnt.leftday)

module.exports = router