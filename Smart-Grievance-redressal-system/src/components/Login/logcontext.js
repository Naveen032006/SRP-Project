import { createContext, useState } from "react";
export const Logincontext=createContext();
const isloggedinlocal=localStorage.getItem("isloggedinn");
export function Loginprovider({children}){  
     const [login,setlogin]=useState(isloggedinlocal==
        "true"?true:false);
     const[userid,setuserid]=useState("");
    
    return(
        <Logincontext.Provider  value={{login,setlogin,userid,setuserid}}>
            {children}
        </Logincontext.Provider>
    );
}
