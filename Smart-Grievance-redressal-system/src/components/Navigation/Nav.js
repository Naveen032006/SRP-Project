import React from "react";
import "./Nav.css";
import Color from "../Color";
import { Authuse } from "../../context/Authcontext";  // ✅
import { useUI } from "../../context/Navcontext";      // ✅

// ✅ No props at all — everything from context
function Nav() {
  const { login, setLogin, role } = Authuse();
  const { section, setSection, navOpen, setNavOpen } = useUI();

  const navItemStyle = (key) => ({
    border: `5px solid ${Color.primary}`,
    color: Color.secondary,
    background: section === key ? Color.primary : "transparent",
    transition: "all 0.2s ease-in-out",
    fontSize: "12px",
  });

  const text = role === "user" ? "My Complaints" : "All Complaints";

  return (
    <div className="verticalNav" style={{ backgroundColor: Color.white }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li className={`overv ${section === "overview" ? "open" : ""}`} style={navItemStyle("overview")} onClick={() => setSection("overview")}>
          Overview
        </li>
        {role === "user" ? (
          <li className={`vnav ${section === "subcomplain" ? "open" : ""}`} style={navItemStyle("subcomplain")} onClick={() => setSection("subcomplain")}>
            Submit Complaints
          </li>
        ) : (
          <>
            <li className={`vnav ${section === "resolve" ? "open" : ""}`} style={navItemStyle("resolve")} onClick={() => setSection("resolve")}>
              Resolve Complaints
            </li>
            <li className={`anal ${section === "staff" ? "open" : ""}`} style={navItemStyle("staff")} onClick={() => setSection("staff")}>
              Staff management
            </li>
          </>
        )}
        <li className={`mycom ${section === "mycomplain" ? "open" : ""}`} style={navItemStyle("mycomplain")} onClick={() => setSection("mycomplain")}>
          {text}
        </li>
        <li className={`anal ${section === "analytics" ? "open" : ""}`} style={navItemStyle("analytics")} onClick={() => setSection("analytics")}>
          Analytics
        </li>
        <li
          className="logout"
          onClick={() => {
            setLogin(true);   // ✅ true = show login screen again
            setNavOpen(false); // ✅ close nav
          }}
          style={{ background: Color.secondary, color: Color.white, cursor: "pointer", transition: "background 0.2s ease-in-out" }}
        >
          Log Out
        </li>
      </ul>
    </div>
  );
}

export default Nav;