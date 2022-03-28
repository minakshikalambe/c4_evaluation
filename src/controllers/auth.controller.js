const User=require("../models/user.models");
const jt=require("jsonwebtoken");
require('dotenv').config()
const generateToken=(user)=>{
    return jt.sign({user},process.env.KEY)
};

const register=async(req,res)=>{
    try {
        let user=await findOne({email:req.body.email})
        if(user)
        {
            return res.status(400).send({message:"User already exist"})
        }
        user=await User.create(req.body);
        const token=generateToken(user);
        return res.status(200).send({user,token})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}

const login=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});

        if(!user)
        {
            return res.status(400).send("user does not exist");
        }
        const match=user.checkPassword(req.body.password)
    
        if(!match)
        {
            return res.status(400).send("wron password")
        }
        const token=generateToken(user);
        return res.send(200).send({user,token});
        
    } catch (error) {
        res.status(400).send({message:error.message})
    }
 
}
module.exports={register,login}
