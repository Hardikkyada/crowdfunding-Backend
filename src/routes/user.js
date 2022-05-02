const express = require('express');

const upload = require('../middlware/Uplodefile');

const router = new express.Router();

const usercnt = require('../controllers/user');
const auth = require('../middlware/authserver');

router.get('/test', (req, res) => {
  res.send('Hello Roter!');
});

router.post('/login', usercnt.login);

router.post('/reg', usercnt.reg);

router.get('/list', usercnt.userlist);

// router.get('/Uplodeimg' ,usercnt.userlist)

// router.patch('/Updateuser/:id',[auth,upload.single("profile")],usercnt.edituser)
router.patch('/Updateuser/:id', auth, usercnt.edituser);

router.get('/Deleteuser/:id', auth, usercnt.deleteuser);

router.get('/logout', auth, usercnt.logout);

router.get('/user', auth, usercnt.user);

module.exports = router;
