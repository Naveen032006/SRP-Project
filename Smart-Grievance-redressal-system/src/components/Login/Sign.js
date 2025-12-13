import Color from "../Color";

const Sign=({ loginset})=>{
    const handlesubmit=(e)=>{
        e.preventDefault();
        let userid=document.getElementById("userid").value;
        let pass1=document.getElementById("password1").value;
        let pass2=document.getElementById("password2").value
        if(pass1!==pass2){
            alert("Please re-enter password correctly")
        }
        else{
            
            loginset(false);
            console.log(pass1);
            console.log(pass2);
        }
    }
    return(
        <form className="container" onSubmit={handlesubmit} style={{backgroundColor:Color.primary}}>
            <h2>User id:</h2>
            <input id="userid" type="text" placeholder="Enter new user id" required/>
            <h2>Password:</h2>
            <input type="password" id="password1" placeholder="Enter new password" required/>
            <h2>Confirm password:</h2>
            <input type="password" id="password2" placeholder="Re-enter password" required/>
            <br/>
            <button id="submit" style={{color:Color.white,backgroundColor:Color.secondary}}> Submit</button>
        </form>
    )
}
export default Sign;