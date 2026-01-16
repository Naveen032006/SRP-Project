const mongoose=require("mongoose")
const schema=mongoose.Schema;
const issueSchema=new schema({
    issueTitle:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    status:{
        type:String,
         enum:["Pending","In_Progress","Resolved","Rejected"],
         default:"Pending"
    },
     priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Low"
    },
     createdAt:{
        type:Date,
        default:new Date
     },
     location:{
        district:{
            type:String,
            required:true
        },
        taluk:{
            type:String,
            required:true
        },
        ward:{
            type:String,
            required:true
        }
    },
     likeCount:{
        type:Number,
        default:0
    },
    user:{
        userid:{
            type:String,
            required:true
        }
    }
},
{timestamps:true})
const Issuemodel=mongoose.model("issue",issueSchema)
module.exports=Issuemodel