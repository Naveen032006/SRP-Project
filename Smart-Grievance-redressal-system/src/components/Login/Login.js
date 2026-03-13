import { useState } from "react";
import Sign from "./Sign";
import Color from "../Color";
import { Authuse } from "../../context/Authcontext";  // ✅ correct import

function Login() {
  // ✅ All state pulled from context — no props needed
  const { setLogin, UserId, setUserId, role, setRole } = Authuse();
  const [pass, setpass] = useState("");
  const [sign, setsign] = useState(false);
  const [focused, setFocused] = useState("");

  const text = role === "user" ? "User Login" : "Admin Login";

  const baseInputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    backgroundColor: Color.inputBackground ?? Color.gray50,
    color: Color.foreground,
    boxSizing: "border-box",
    transition: "box-shadow 150ms ease, border-color 150ms ease",
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!UserId || !pass) {
      alert("Please enter User ID and Password");
      return;
    }

    if (role === "Admin") {
      if (UserId !== "admin" || pass !== "admin123") {
        alert("Invalid Admin credentials");
        return;
      }
    }

    if (role === "user") {
      if (UserId !== "user" || pass !== "user123") {
        alert("Invalid User credentials");
        return;
      }
    }

    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("role", role);
    setLogin(false);
  };

  return sign ? (
    <Sign />
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
        margin: "0 auto",
      }}
      onSubmit={handlesubmit}
    >
      {/* ✅ Role toggle lives here now, not in App.js */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "12px" }}>
        <label
          style={{
            backgroundColor: role === "user" ? Color.emerald500 : "#ccc",
            color: Color.foreground,
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={() => setRole("user")}
        >
          User
        </label>
        <label
          style={{
            backgroundColor: role === "Admin" ? Color.emerald500 : "#ccc",
            color: Color.foreground,
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={() => setRole("Admin")}
        >
          Admin
        </label>
      </div>

      <h2 style={{ margin: 0, textAlign: "center", color: Color.foreground }}>{text}</h2>

      <input
        id="UserId"
        type="text"
        placeholder="Enter user id"
        value={UserId ?? ""}
        onChange={(e) => setUserId(e.target.value)}
        onFocus={() => setFocused("UserId")}
        onBlur={() => setFocused("")}
        style={{
          ...baseInputStyle,
          border: `1px solid ${focused === "UserId" ? Color.emerald500 : Color.border}`,
          boxShadow: focused === "UserId" ? `0 0 0 6px ${Color.focusRing}` : "none",
          marginLeft: "0px",
        }}
      />

      <h2 style={{ margin: 0, color: "black" }}>Password:</h2>
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
          boxShadow: focused === "password" ? `0 0 0 6px ${Color.focusRing}` : "none",
          marginLeft: "0px",
        }}
      />

      <br />

      <button
        id="submit"
        style={{
          background: Color.gradientPrimary ?? Color.emerald500,
          color: Color.background ?? "#fff",
          opacity: UserId && pass ? 1 : 0.4,
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: UserId && pass ? "pointer" : "not-allowed",
          alignSelf: "center",
        }}
      >
        Submit
      </button>

      {role === "user" && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
          <h4 style={{ color: Color.mutedForeground ?? Color.muted }}>
            Don't have an account?
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