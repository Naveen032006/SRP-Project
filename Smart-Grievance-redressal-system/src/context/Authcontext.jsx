import { Children, createContext, useContext, useState } from "react";

const AuthContext=createContext();
export const AuthProvider=({children})=>{
   const [login, setLogin] = useState(false);
    const [role, setRole] = useState("user");
    const [UserId,setUserId]=useState(null)
    const logout=()=>{
        setLogin(false);
        setUserId(null)
        setRole("user")
        localStorage.clear()
    }
    return(
        <AuthContext.Provider value={{login, setLogin,role, setRole,UserId,setUserId,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const Authuse=()=>useContext(AuthContext)