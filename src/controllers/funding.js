const postdata = require("../model/funding");
const funddata = require("../model/Fund");

exports.getallpost = async (req,res) => {
    try{
        const posts = await postdata.find().populate("topic")

        if(posts.length === 0){
            return res.json({data : "Post List is Empty"})
        }
        
        return res.json({data : posts})
    }catch(e){
        return res.json({error : e.message})
        //res.status(400).send(e)
    }
}

exports.addpost = async (req,res) => {

    console.log(req.body.data);
    
    const post = JSON.parse(req.body.data)
    console.log(post);

    if(req.file)
    {
        post.image = req.file?.filename
    }

    console.log(post);

    post.user = req.user._id
    
    postdata.create(post).then(()=>{
        return res.json({data : post})
    }).catch((err) =>{
        return res.json({error : err.message})
    })
}


exports.editpost = async (req,res) => {

    try{
        const post = JSON.parse(req.body.data)

        if(req.file)
        {
            post.image = req.file?.filename
        }

        console.log(post);
        
        await postdata.findByIdAndUpdate(req.params.id,post)

        const data = await postdata.findById(req.params.id);
        
        res.json({user : data })
    }catch(e){
        console.log(e);
        return res.status(404).send({error:e.message})
    }

}


exports.imgupload = async (req,res)=> {
    try{
        console.log(req.body,req.files);
        return res.status(200).json({data : "Add SuccessFully"})
    }catch(e){
        console.log(e.message);
        return res.status(400).json({error:e.message})
    }
}

exports.deletepost = async (req,res) => {
    const id = req.params.id;
    try{
        const posts = await postdata.findByIdAndDelete(id)
        if(posts){
            return res.json({data : "Post is Deleted"})
        }
        else{
            return res.json({data : "Post Not Found"})
        }

    }catch(e){
        return res.json({error : e.message})
        //res.status(400).send(e)
    }
}

exports.getpost = async(req,res) =>{
    const id = req.params.id

    if(!id){
        return res.json({error : "Id in Params Not Found"})
    }

    try{
        const posts = await postdata.findOne({_id:id})

        if(!posts){
            return res.json({data : "Post Not Found"})
        }
        
        return res.json({data : posts})
    }catch(e){
        return res.json({error : e.message})
    }

}

exports.getpostbyuser = async(req,res) =>{
    const id = req.params.id

    if(!id){
        return res.status(400).json({error : "Id in Params Not Found"})
    }

    try{
        const posts = await postdata.find({user:id}).populate("topic")

        if(posts.length === 0){
            return res.status(404).json({data : "Post Not Found"})
        }
        
        return res.status(200).json({data : posts})
    }catch(e){
        return res.status(400).json({error : e.message})
    }

}

//get post by topic

exports.getpostbytopic = async (req,res) =>{
    const topic = req.params?.topic;

    try{
        const posts = await postdata.find({ topic: topic});

        if(posts.length === 0){
            return res.json({data : "Data Not Found"})
        }  
        return res.json({data : posts})
    }catch(e){
        return res.json({error : e.message})
        //res.status(400).send(e)
    }
}

exports.leftday = async (req,res)=> {
    const id = req.params?.id;
    try{
        const posts = await postdata.findById(id)

        if(posts.length === 0){
            return res.json({data : "Data Not Found"})
        }
        const days = posts.totalday;
        
        const date = posts.createdAt.getTime()

        const curdate = new Date().getTime()

        const x = (curdate - date) 

        const dayleft = Math.round(x / (24*60*60*1000))

        
        return res.json({data : (days - dayleft)})
    }catch(e){
        return res.json({error : e.message})
        //res.status(400).send(e)
    }

}