const express = require("express");
const auth = require("../middlware/authserver");
const fundcnt = require("../controllers/Fund");

const router = new express.Router();

router.get("/status", auth, fundcnt.status);

router.get("/history/:id", auth, fundcnt.history);

router.post("/Addfund", auth, fundcnt.addfund);

router.get("/totalfund/:id", auth, fundcnt.Totalamount);

router.get("/totalsupports/:id", fundcnt.Totalsupports);

module.exports = router;
