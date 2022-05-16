const funddata = require('../model/Fund');

exports.status = async (req, res) => {
  try {
    const posts = await funddata.find();

    if (posts.length === 0) {
      return res.status(404).json({data: 'Post List is Empty'});
    }

    return res.status(200).json({data: posts});
  } catch (e) {
    return res.status(400).json({error: e.message});
    //res.status(400).send(e)
  }
};

exports.history = async (req, res) => {
  const userid = req.params.id;
  try {
    const history = await funddata
      .find({user: userid})
      .sort({createdAt: -1})
      .populate('Fundpost');

    if (history.length === 0) {
      return res.status(404).json({data: 'Post List is Empty'});
    }
    console.log(history);
    return res.status(200).json({data: history});
  } catch (e) {
    return res.status(400).json({error: e.message});
    //res.status(400).send(e)
  }
};

exports.addfund = async (req, res) => {
  const post = req.body;

  const newpost = new funddata(post);
  await newpost.save();

  const data = await newpost.populate('Fundpost');

  return res.json({data});

  // const x = funddata.create(post).then((resdata)=>{
  //     // console.log(resdata.populate('Fundpost'));
  //     return res.json({data : resdata.populate('Fundpost')})
  // }).catch((err) =>{
  //     return res.json({error : err.message})
  // })

  // res.json({data : x})
};

exports.Totalamount = async (req, res) => {
  const id = req.params.id;
  let total = [];
  let sum = 0;

  try {
    total = await funddata.find({Fundpost: id});

    total.map((val, i) => {
      sum += total[i].Totalamount;
    });

    return res.json({data: sum});
  } catch (e) {
    return res.json({error: e.message});
    //res.status(400).send(e)
  }
};
