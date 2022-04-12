const mongoose = require('mongoose');

const postschem = mongoose.Schema({
    desc:{
        type:String,
        unique:true,
        required:true
    },
    amount:
    {
        type:Number,
        required:true
    },
    totalday:{
        type:Number,
        required:true
    },
    topic:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"topic"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }
},
{ timestamps: true })

const postmodel = mongoose.model("Fundingpost",postschem,"Fundingpost")

module.exports = postmodel