var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken')
const userShema=require('../models/usermodel')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/create',async (req,res)=>{
  
  await userShema.create({...req.body})
  return res.send("user created successfully")
})
router.post('/login',async (req,res)=>{
    const {user,password}=req.body
    const username=await userShema.findOne({"user":user})
    if(!username) res.send("invalid credential")
    if(password===username.  password){
      const token=jwt.sign({user,role:"user"},"grienvence",{expiresIn:'1h'})
     return res.status(201).json({
    success: true,
    message: "User created successfully"
  });


    } 
    return res.send("invalid credential")
})


module.exports = router;
