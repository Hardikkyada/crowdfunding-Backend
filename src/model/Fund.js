const mongoose = require('mongoose');

const fundschem = mongoose.Schema({
    Fundpost:{
        type:String,
        required:true,
        ref:"Fundingpost"
    },
    Totalamount:
    {
        type:Number,
        required:true
    },
    // TranctionId:
    // {
    //     type:String,
    //     required:true
    // },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }
},
{ timestamps: true })

const postmodel = mongoose.model("Fund",fundschem,"Fund")

module.exports = postmodel