import { useState } from "react";
import Sign from "./Sign";
import Color from "../Color";



function Login({ userdata, loginset, text, role }) {
  const [userid, setuserid] = useState("");
  const [pass, setpass] = useState("");
  const [sign, setsign] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();

    // -----------------------------
    // FRONTEND-ONLY LOGIN LOGIC
    // -----------------------------

    if (!userid || !pass) {
      alert("Please enter User ID and Password");
      return;
    }

    // OPTIONAL: Dummy credential check
    if (role === "Admin") {
      if (userid !== "admin" || pass !== "admin123") {
        alert("Invalid Admin credentials");
        return;
      }
    }

    if (role === "user") {
      if (userid !== "user" || pass !== "user123") {
        alert("Invalid User credentials");
        return;
      }
    }

    // Save dummy login info
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("role", role);

    userdata(userid);     // send userid to App.js
    loginset(false);      // login success
  };

  return sign ? (
    <Sign userdata={userdata} loginset={loginset} />
  ) : (
    <form
      className="container"
      style={{ backgroundColor: Color.primary }}
      onSubmit={handlesubmit}
    >
      <h2>{text}</h2>

      <input
        id="userid"
        type="text"
        placeholder="Enter user id"
        value={userid}
        onChange={(e) => setuserid(e.target.value)}
      />

      <h2>Password:</h2>
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        value={pass}
        onChange={(e) => setpass(e.target.value)}
      />

      <br />

      <button
        id="submit"
        style={{
          backgroundColor: Color.secondary,
          color: Color.white,
          opacity: userid && pass ? 1 : 0.4,
        }}
      >
        Submit
      </button>

      {role === "user" && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h4 style={{ color: Color.supreme }}>
            Don't you have an account?
          </h4>
          <span
            className="sign"
            onClick={() => setsign(true)}
            style={{ color: Color.secondary, cursor: "pointer" }}
          >
            signup
          </span>
        </div>
      )}
    </form>
  );
}

export default Login;
