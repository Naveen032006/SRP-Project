mongoose=require('mongoose')
const userShema=new mongoose.Schema({
    user:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }   
})
const userschema=mongoose.model("user",userShema)
module.exports=userschema