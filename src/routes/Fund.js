const express = require('express');
const auth = require("../middlware/authserver")
const fundcnt = require("../controllers/Fund")

const router = new express.Router()

router.get("/status",auth,fundcnt.status)

router.post("/Addfund",auth,fundcnt.addfund)

router.get("/totalfund/:id",auth,fundcnt.Totalamount)

module.exports = router