import { Children, createContext, useContext, useState } from "react";

const IssueContext=createContext()
export const Issueprovider=({children})=>{
    const [issue,setissue]=useState([])
    const addIssue=(issue)=>{
        setissue(prev=>[issue,...prev])
    }
    const Updateissue=(id,data)=>{
        setissue(prev=>
            prev.map(issue=>
                issue.id==id?{...issue,...data}:issue
            )
        )
    }
    return (
        <IssueContext.Provider value={{issue,setissue,addIssue,Updateissue}}>
            {children}
        </IssueContext.Provider>
    )
}
export const useIssue=()=>useContext(IssueContext)