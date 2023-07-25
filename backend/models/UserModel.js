const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    number:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        required:[true,"name is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
},{//for using virtual function ..
    toJSON:{virtuals:true},
    toObject:{virtuals:true}});

module.exports=mongoose.model("userDB",userSchema);