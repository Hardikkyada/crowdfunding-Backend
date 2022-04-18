const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ProfileImg:{
        type:String,
        required:true
    },
    Surname:{
        type:String,
        required:true
    },
    mobileno:{
        type:String,
        required:true,
        maxlength:10,
        minlength:10
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},
{ timestamps: true })


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.KEY)

    // user.tokens = user.tokens.concat({ token })

    await user.save()

    //console.log(token);
    
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    // delete userObject.password
    delete userObject.tokens

    return userObject
}

const usermodel = mongoose.model("user",userSchema,"user")

module.exports = usermodel