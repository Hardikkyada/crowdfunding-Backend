const userdata = require("../model/user");

exports.login = async (req,res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    if(email === "" || password === ""){
        return res.status(400).json({data:"Passing Empty Value Not allow"})
    }

    if(!email || !password){
        return res.status(400).json({data:"Email and Password Value are Required"})
    }

    let user = "";

    try{
        user = await userdata.findOne({email:email,password:password})
        if(!user)
        {
            return res.status(400).json({data : 'user not found'})
        }

        const token = await user.generateAuthToken()
        res.send({ user, token })
        //res.send( user );
    
    }catch(e){
        res.send( e.message )
    }

    //const token = await user.generateAuthToken()
    //res.send({user,token})    
}

exports.reg = async  (req,res) => {
    const user = new userdata(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        console.log(user);
        res.status(201).send({ user, token })
        
    } catch (e) {
        res.status(400).send(e.message)
    }
}

exports.userlist  = async (req,res) => {
    try{
        const udata = await userdata.find();
        return res.json({data:udata})
    }catch(e){
        return res.json({error:e.message})
    }
}

exports.logout = async (req,res) => {
    res.status(200).send("Logout SuccessFulll")
}