const funddata = require("../model/Fund");

exports.status = async (req,res) => {
    try{
        const posts = await funddata.find()

        if(posts.length === 0){
            return res.json({data : "Post List is Empty"})
        }
        
        return res.json({data : posts})
 
    }catch(e){
        return res.json({error : e.message})
        //res.status(400).send(e)
    }
}



exports.history = async (req,res) => {
    const userid = req.params.id
    try{
        const history = await funddata.find({user:userid}).populate("Fundpost")

        if(history.length === 0){
            return res.json({data : "Post List is Empty"})
        }
        console.log(history);
        return res.json({data : history})
 
    }catch(e){
        return res.json({error : e.message})
        //res.status(400).send(e)
    }
}



exports.addfund = async (req,res) =>{
    const post = req.body;
    funddata.create(post).then(()=>{
        return res.json({data : post})
    }).catch((err) =>{
        return res.json({error : err.message})
    })
}

exports.Totalamount = async (req,res)=>{
    const id = req.params.id;
    
    let total = []
    let sum = 0

    try{

        total = await funddata.find({Fundpost:id})


        total.map((val,i)=> {
            sum += total[i].Totalamount
            
        })

        return res.json({data : sum})
 
    }catch(e){
        return res.json({error : e.message})
        //res.status(400).send(e)
    }
}