const mongoose = require('mongoose');

const topicschem = mongoose.Schema({
    topic:{
        type:String,
        required:true,
        unique:true
    }
},
{ timestamps: true })

const topicmodel = mongoose.model("topic",topicschem,"topic")

module.exports = topicmodel