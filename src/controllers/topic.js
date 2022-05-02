const topicdata = require("../model/topic");

exports.getalltopic = async (req,res) => {
    try{
        const topics = await topicdata.find()

        if(topics.length === 0){
            return res.json({data : "Topic List is Empty"})
        }
        
        return res.json({data : topics})
    }catch(e){
        return res.json({error : e.message})
        //res.status(400).send(e)
    }
}

exports.addtopic = async (req,res) => {
    const topic = req.body;
    
    topicdata.create(topic).then((resdata)=>{
        return res.json({data : resdata})
    }).catch((err) =>{
        return res.json({error : err.message})
    })
}