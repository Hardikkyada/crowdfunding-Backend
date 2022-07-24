const Logger = require("nodemon/lib/utils/log");
const userdata = require("../model/user");

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === "" || password === "") {
    return res.status(400).json({ data: "Passing Empty Value Not allow" });
  }

  if (!email || !password) {
    return res
      .status(400)
      .json({ data: "Email and Password Value are Required" });
  }

  let user = "";

  try {
    const useremail = await userdata.findOne({ email: email });
    
    if (!useremail) {
      return res
        .status(404)
        .json({ error: "This Email Address is Not Register" });
    }

    user = await userdata.findOne({ email: email, password: password });

    if (!user) {
      console.log("4");
      return res.status(404).json({ error: "Invalid PassWord" });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
    //res.send( user );
  } catch (e) {
    res.send(e.message);
  }

  //const token = await user.generateAuthToken()
  //res.send({user,token})
};

exports.googlelogin = async (req, res) => {
  const data = req.body;
  console.log(data);

  let user = "";

  try {
    user = await userdata.findOne({ email: data.email });
    if (!user) {
      const newuser = new userdata(data);
      await newuser.save();
      const token = await newuser.generateAuthToken();
      return res.status(201).send({ newuser, token });
      // return res.status(400).json({data: 'user not found'});
    } else {
      const token = await user.generateAuthToken();
      return res.status(201).send({ user, token });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ error: e.message });
  }
};

exports.reg = async (req, res) => {
  //    console.log("sdfsder",req.body.data);

  //     const data = JSON.parse(req.body.data)

  //     data.ProfileImg = req.file?.filename

  const user = new userdata(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    console.log(user);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.userlist = async (req, res) => {
  try {
    const udata = await userdata.find();
    return res.json({ data: udata });
  } catch (e) {
    return res.json({ error: e.message });
  }
};

exports.user = async (req, res) => {
  try {
    return res.json({ data: req.user });
  } catch (e) {
    return res.json({ error: e.message });
  }
};

exports.edituser = async (req, res) => {
  // console.log(req.body.data,"f",req.file);
  try {
    // const user = JSON.parse(req.body.data)

    // if(req.file)
    // {
    //     user.ProfileImg = req.file?.filename
    // }

    // console.log(user);

    await userdata.findByIdAndUpdate(req.params.id, req.body);

    const data = await userdata.findById(req.params.id);

    res.json({ user: data });
  } catch (e) {
    console.log(e);
    return res.status(404).send({ error: e.message });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const data = await userdata.findByIdAndDelete(req.params.id);

    return res.json({ data: data });
  } catch (e) {
    return res.json({ error: e.message });
  }
};

exports.logout = async (req, res) => {
  res.status(200).send("Logout SuccessFulll");
};
