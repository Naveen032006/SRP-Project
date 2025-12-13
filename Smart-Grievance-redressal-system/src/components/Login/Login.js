import { useState } from "react";
import Sign from "./Sign";
import Color from "../Color";



function Login({ userdata, loginset, text, role }) {
  const [userid, setuserid] = useState("");
  const [pass, setpass] = useState("");
  const [sign, setsign] = useState(false);
  const [focused, setFocused] = useState("");

  // shared input style
  const baseInputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    backgroundColor: Color.inputBackground ?? Color.gray50,
    color: Color.foreground,
    boxSizing: "border-box",
    transition: "box-shadow 150ms ease, border-color 150ms ease"
  };

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
      style={{
        backgroundColor: Color.background,
        padding: "18px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "440px",
        margin: "0 auto"
      }}
      onSubmit={handlesubmit}
    >
      <h2 style={{ margin: 0, textAlign: "center", color: Color.foreground }}>{text}</h2>

      <input
        id="userid"
        type="text"
        placeholder="Enter user id"
        value={userid}
        onChange={(e) => setuserid(e.target.value)}
        onFocus={() => setFocused("userid")}
        onBlur={() => setFocused("")}
        style={{
          ...baseInputStyle,
          border: `1px solid ${focused === "userid" ? Color.emerald500 : Color.border}`,
          boxShadow: focused === "userid" ? `0 0 0 6px ${Color.focusRing}` : "none"
        }}
      />

      <h2 style={{ margin: 0 }}>Password:</h2>
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        value={pass}
        onChange={(e) => setpass(e.target.value)}
        onFocus={() => setFocused("password")}
        onBlur={() => setFocused("")}
        style={{
          ...baseInputStyle,
          border: `1px solid ${focused === "password" ? Color.emerald500 : Color.border}`,
          boxShadow: focused === "password" ? `0 0 0 6px ${Color.focusRing}` : "none"
        }}
      />

      <br />

      <button
        id="submit"
        style={{
          background: Color.gradientPrimary ?? Color.emerald500,
          color: Color.background ?? "#fff",
          opacity: userid && pass ? 1 : 0.4,
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: userid && pass ? "pointer" : "not-allowed",
          alignSelf: "center"
        }}
      >
        Submit
      </button>

      {role === "user" && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
          <h4 style={{ color: Color.mutedForeground ?? Color.muted }}>
            Don't you have an account?
          </h4>
          <span
            className="sign"
            onClick={() => setsign(true)}
            style={{ color: Color.link ?? Color.emerald500, cursor: "pointer" }}
          >
            signup
          </span>
        </div>
      )}
    </form>
  );
}

export default Login;
