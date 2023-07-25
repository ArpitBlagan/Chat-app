const express=require('express');
const router=express.Router();
const {loginUser,registerUser}=require('./controllers/user');
const {validateToken}=require('./Validate');
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.use(validateToken);
module.exports=router