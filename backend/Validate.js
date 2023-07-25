const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
exports.validateToken=asyncHandler(async(req,res,next)=>{
    const token=req.cookies.jwt;
    jwt.verify(token,process.env.ACCESSTOKEN,(err,decoded)=>{
        if(err){
            res.status(401).json({message:"token is expired"});
        }
        req.user=decoded.user;
    });next();
});