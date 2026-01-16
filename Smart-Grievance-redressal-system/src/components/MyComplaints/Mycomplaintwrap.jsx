import { Paper, Typography } from "@mui/material";
import { Mycomplainbox } from "./mycomplaintbox";
import download from './download.jpeg'
import { useEffect, useState } from "react";

export function Mycomplainwrap({user}){
    const [issues,setissues]=useState([])
    const [status,setstatus]=useState("")
    async function getcomplaints(){
        const response=await fetch("http://localhost:3000/complaint/allcomplaints")
        const data=await response.json()
        setissues([...data])
    }
    useEffect(()=>{
        getcomplaints()
    },[])

    return (
        <Paper elevation={1} sx={{ borderRadius: "16px", p:"2px" ,m:2,overflow:"auto"}}>
            <Paper elevation={1} spacing={2} sx={{padding:"10px", borderRadius: "16px",maxHeight:"400px",overflowY:"scroll"}}>
            {issues.length===0?<Typography variant="body1">No issues reported yet.</Typography>:
          
            issues.map((issues)=>{
               
                return <Mycomplainbox label={issues.issueTitle} discription={issues.description} catogory={issues.category} setstatus={setstatus} status={issues.status} priority={issues.priority} date={issues.date} location={issues.location} response={issues.response} update={issues.update} selectedImage={issues.selectedImage} user={user}/>
            }
            )
        }
        </Paper>
            </Paper>

    );
}