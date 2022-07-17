const postdata = require("../model/funding");
const funddata = require("../model/Fund");

exports.getuserpost = async (req, res) => {
  try {
    const posts = await postdata
      .find({ user: req.params?.id })
      .sort({ createdAt: -1 })
      .populate("topic").populate("user");

    if (posts.length === 0) {
      return res.status(400).json({ data: "Post List is Empty" });
    }
    console.log(posts);
    return res.json({ data: posts });
  } catch (e) {
    return res.json({ error: e.message });
    //res.status(400).send(e)
  }
};

exports.getallpost = async (req, res) => {
  if (req.params?.data === "All") {
    try {
      let newdata = [];
      const posts = await postdata
        .find()
        .sort({ amount: -1 })
        .populate("topic").populate("user")

      if (posts.length === 0) {
        return res.json({ data: "Post List is Empty" });
      }

      posts.map((i) => {
        const days = i.totalday;

        const date = i.createdAt.getTime();

        const curdate = new Date().getTime();

        const x = curdate - date;

        const dayleft = Math.round(x / (24 * 60 * 60 * 1000));

        let newObj = JSON.parse(JSON.stringify(i));

        newObj.dayleft = days - dayleft;

        console.log(newObj);

        newdata.push(newObj);
      });
      newdata = newdata.sort((a, b) => a.dayleft - b.dayleft);

      const data = newdata.filter((i) => i.dayleft > 0);

      return res.json({ data });
    } catch (e) {
      return res.json({ error: e.message });
      //res.status(400).send(e)
    }
  } else if (req.params?.data === "TargetAmount") {
    try {
      const posts = await postdata
        .find()
        .sort({ amount: -1 })
        .populate("topic").populate("user")

      if (posts.length === 0) {
        return res.status(400).json({ data: "Post List is Empty" });
      }
      console.log(posts);
      return res.json({ data: posts });
    } catch (e) {
      return res.json({ error: e.message });
      //res.status(400).send(e)
    }
  } else if (req.params?.data === "RaiseAmount") {
    let total = [];
    let sum = 0;
    let newobj = [];
    try {
      const posts = await postdata.find().populate("topic").populate("user");

      if (posts.length === 0) {
        return res.status(400).json({ data: "Post List is Empty" });
      }
      total = await funddata.find().populate("Fundpost");

      posts.map((postd) => {
        sum = 0;
        total.map((val, i) => {
          // console.log(postd.title === val.Fundpost.title);
          if (val.Fundpost.title === postd.title) {
            sum += total[i].Totalamount;
          }
        });
        const x = JSON.parse(JSON.stringify(postd));
        x.raiseamount = sum;
        newobj.push(x);
      });

      newobj = newobj.sort((a, b) => a.raiseamount - b.raiseamount);

      return res.json({ data: newobj });
    } catch (e) {
      return res.json({ error: e.message });
      //res.status(400).send(e)
    }

    //   console.log(posts);
    //   return res.json({data: posts});
    // } catch (e) {
    //   return res.json({error: e.message});
    //   //res.status(400).send(e)
    // }
  } else if (req.params?.data === "LeftTime") {
    try {
      let newdata = [];
      const posts = await postdata.find().populate("topic").populate("user");

      if (posts.length === 0) {
        return res.json({ data: "Post List is Empty" });
      }

      posts.map((i) => {
        const days = i.totalday;

        const date = i.createdAt.getTime();

        const curdate = new Date().getTime();

        const x = curdate - date;

        const dayleft = Math.round(x / (24 * 60 * 60 * 1000));

        let newObj = JSON.parse(JSON.stringify(i));

        newObj.dayleft = days - dayleft;

        console.log(newObj);

        newdata.push(newObj);
      });
      newdata = newdata.sort((a, b) => a.dayleft - b.dayleft);
      return res.json({ data: newdata });
    } catch (e) {
      return res.json({ error: e.message });
      //res.status(400).send(e)
    }
  } else {
    const x = req.params?.data;
    console.log(x);
    try {
      const posts = await postdata
        .find({ title: { $regex: req.params?.data, $options: "i" } })
        .populate("topic").populate("user");

      if (posts.length === 0) {
        return res.status(404).json({ data: "Post List is Empty" });
      }
      console.log(posts);
      return res.json({ data: posts });
    } catch (e) {
      return res.json({ error: e.message });
      //res.status(400).send(e)
    }
  }
};

exports.addpost = async (req, res) => {
  // console.log(req.body.data,"f",req.file);

  // const post = JSON.parse(req.body.data)
  // console.log(post);

  // if(req.file)
  // {
  //     post.image = req.file?.filename
  // }

  console.log(req.body.user);

  req.body.user = req.user._id;

  postdata
    .create(req.body)
    .then((data) => {
      return res.json({ data: data });
    })
    .catch((err) => {
      return res.json({ error: err.message });
    });
};

exports.editpost = async (req, res) => {
  // console.log(req.body.data);

  try {
    // const post = JSON.parse(req.body.data)

    // if(req.file)
    // {
    //     post.image = req.file?.filename
    // }

    // console.log(post);

    await postdata.findByIdAndUpdate(req.params.id, req.body);

    const data = await postdata.findById(req.params.id).populate("topic").populate("user");

    res.json({ post: data });
  } catch (e) {
    console.log(e);
    return res.status(404).send({ error: e.message });
  }
};

exports.imgupload = async (req, res) => {
  try {
    console.log(req.body, req.files);
    return res.status(200).json({ data: "Add SuccessFully" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: e.message });
  }
};

exports.deletepost = async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await postdata.findByIdAndDelete(id);
    if (posts) {
      return res.json({ data: "Post is Deleted" });
    } else {
      return res.json({ data: "Post Not Found" });
    }
  } catch (e) {
    return res.json({ error: e.message });
    //res.status(400).send(e)
  }
};

exports.getpost = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({ error: "Id in Params Not Found" });
  }

  try {
    const posts = await postdata.findOne({ _id: id });

    if (!posts) {
      return res.json({ data: "Post Not Found" });
    }

    return res.json({ data: posts });
  } catch (e) {
    return res.json({ error: e.message });
  }
};

exports.getpostbyuser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Id in Params Not Found" });
  }

  try {
    const posts = await postdata.find({ user: id }).populate("topic").populate("user");

    if (posts.length === 0) {
      return res.status(404).json({ data: "Post Not Found" });
    }

    return res.status(200).json({ data: posts });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

//get post by topic

exports.getpostbytopic = async (req, res) => {
  const topic = req.params?.topic;

  try {
    const posts = await postdata.find({ topic: topic });

    if (posts.length === 0) {
      return res.json({ data: "Data Not Found" });
    }
    return res.json({ data: posts });
  } catch (e) {
    return res.json({ error: e.message });
    //res.status(400).send(e)
  }
};

exports.leftday = async (req, res) => {
  const id = req.params?.id;
  try {
    const posts = await postdata.findById(id);

    if (posts.length === 0) {
      return res.json({ data: "Data Not Found" });
    }
    const days = posts.totalday;

    const date = posts.createdAt.getTime();

    const curdate = new Date().getTime();

    const x = curdate - date;

    const dayleft = Math.round(x / (24 * 60 * 60 * 1000));

    return res.json({ data: days - dayleft });
  } catch (e) {
    return res.json({ error: e.message });
    //res.status(400).send(e)
  }
};
