const asyncHandler=require('express-async-handler');
const userDB=require('../models/UserModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
exports.registerUser=asyncHandler(async(req,res)=>{
    const {name,password,number}=req.body;
    console.log(number,name,password);
    const userr=await userDB.findOne({number}); 
    if(userr){
        res.status(409);throw new Error("already registered");
    }
    console.log(name);
    const hash=await bcrypt.hash(password,10);
    const user=await userDB.create({
       number,name,password:hash
    });console.log(user);
    if(user){
        res.status(202).json(user);
    }else{
    res.status(404);throw new Error('Something went wrong');}
});
exports.loginUser=asyncHandler(async(req,res)=>{
    const {number,password}=req.body;
    const user=await userDB.findOne({number});
    if(user&&(await bcrypt.compare(password,user.password))){
        const token=jwt.sign({
           user:{ id:user._id,
            number:user.number}

        },process.env.ACCESSTOKEN)
        res.cookie("jwt",token,{
            //30 days in milisecond
            expires:new  Date(Date.now()+(30*24*60*60*1000)),
            httpOnly:true
        });
        res.status(202).json(user);
    }
    else{res.status(404);throw new Error('invalid password and number combination')}
});