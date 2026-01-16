import { useState } from "react";
import Color from "../Color";
 

const Sign=({ loginset})=>{
    const [formData, setFormData] = useState({
    userid: "",
    email: "",
    phone: "",
    password1: "",
    password2: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
   const handlesubmit = async (e) => {
    e.preventDefault();

    const { user, email, phone, password1, password2 } = formData;

    if (password1 !== password2) {
      alert("Please re-enter password correctly");
      return;
    }

    const userData = {
      user:formData.userid,
      password:formData.password1,
      email:formData.email,
      phone:formData.phone, 
    };

    try {
      const response = await fetch("http://localhost:3000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log(data);

      loginset(false);

    } catch (error) {
      console.error("Error:", error);
    }
  };
   
    return(
        <form className="container" onSubmit={handlesubmit} style={{ backgroundColor: Color.primary }}>

  <h2 style={{color:"black"}}>User id:</h2>
  <input id="userid" type="text" placeholder="Enter new user id" onChange={handleChange} required />

  <h2 style={{color:"black"}}>Email id:</h2>
  <input id="email" type="email" placeholder="Enter email id" onChange={handleChange} required />

  <h2 style={{color:"black"}}>Phone no:</h2>
  <input id="phone" type="number" placeholder="Enter Phone number" onChange={handleChange} required />

  <h2 style={{color:"black"}}>Password:</h2>
  <input id="password1" type="password" placeholder="Enter new password" onChange={handleChange} required />

  <h2 style={{color:"black"}}>Confirm password:</h2>
  <input id="password2" type="password" placeholder="Re-enter password" onChange={handleChange} required />

  <br />
  <button id="submit" type="submit" style={{color:"#ffffffff",backgroundColor:"#4dd395ff"}}>Submit</button>
</form>

    )
}
export default Sign;