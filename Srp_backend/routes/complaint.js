let express=require("express")
const complaint=require("../database")
const Issuemodel=require("../models/model")
let route=express.Router()
const jwt=require('jsonwebtoken')
const Autorisation=(req,res,next)=>{
    const token=req.headers.authorization
    
    jwt.verify(token,"grienvence",(err,user)=>{
        if(err) {
            return res.send("authrosation failed")
        }
        if(user.role!=="user") {
            return res.send("authorisation failed")
        }
        next(); 
    })

}
route.post("/create",async (req,res)=>{
    const {label,description,category,status,priority,date,location}=req.body
    await complaint.Insertdata({label,
    description,category,status,priority,date,location})
    res.send("inserted successfully")
})
route.post("/createusingorm",Autorisation,async (req,res)=>{
    const {label,description,category,status,priority,date,location}=req.body
    await Issuemodel.create({...req.body})
    res.send("inserted successfully")
})
route.post("/delete",async (req,res)=>{
    const {label}=req.body
    await complaint.Deletedata({label})
    res.send("deleted successfully")
})
module.exports=route