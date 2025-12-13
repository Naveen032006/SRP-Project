import './App.css';
import Color from './components/Color'
import Login from  './components/Login/Login';
//import Body from './components/Body';
import Nav from './components/Navigation/Nav';
import Mycomplain from './components/MyComplaints/Mycomplain';
import SubComplain from './components/Subcomplaint/SubComplain';

//import Logcontext from './components/logcontext';
import { useContext, useState } from 'react';
import { Link, Route, Routes, useLocation, } from 'react-router-dom';

import OverView from './components/Overview/OverView';
import { Logincontext } from './components/Login/logcontext';
import Analytics from './components/Analytics/Analytics';
import Hnav from './components/Navigation/Hnav';
import AdminHome from './components/Home/AdminHome';
import UserHome from './components/Home/userHome';
import Ward from './components/warddetails/Ward';
import Contact from './components/contactDetails/Contact';


function Header(props){
  const hStyle={
      color: Color.foreground,
      textAlign:"center",
      margin:"0",
  }
  return <h1 style={hStyle}>Hi! {props.title}</h1>
}
function App() {
 
    const [login, setLogin] = useState(true);
  const [userId, setUserId] = useState("Login");
  const [role, setRole] = useState("user");
  const [navOpen, setNavOpen] = useState(false);
  const title = role === "Admin" ? "Welcome, Resolver" : "Welcome Citizen";
const location = useLocation();

  // --- 3. DEFINE PATHS TO HIDE THE HAMBURGER ON ---
  const hideHamburgerOn = ["/Ward-Details", "/Contacts"];
      const liStyle={
          textAlign:"center",
          margin:"50px",
          fontSize:"150%",
          textDecoration:"none",
          color: Color.mutedForeground,
      }
      const buttonStyle={
          background: "#e1e6e7ed",
          color: Color.foreground,
           width:"10%",
           marginTop:".5%",
           height:"50px",
           flex:"0 1 auto",
           borderRadius:"25px",
           borderWidth:"0",
           cursor:"pointer",
           fontSize:"100%",
           marginLeft: "auto",
       }

  return login ? (
    <>
      {/* Login area with visible border */}
      <div
        id="login-container"
        style={{
          border: `1px solid ${Color.border}`,
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '480px',
          margin: '32px auto',
          background: Color.surface,
          boxShadow: `0 2px 8px ${Color.muted}20`
        }}
      >
        <div id="toggle" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '12px' }}>
          <label
            className={`user${role === "user" ? "" : " closed"}`}
            style={{ backgroundColor: Color.emerald500, color: Color.foreground, padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
            onClick={() => setRole("user")}
          >
            User
          </label>
          <label
            className={`admin${role === "user" ? " closed" : ""}`}
            style={{ backgroundColor: Color.emerald500, color: Color.foreground, padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
            onClick={() => setRole("Admin")}
          >
            Admin
          </label>
        </div>

        <Login
          key={role === "user" ? "user" : "admin"}
          userdata={setUserId}
          loginset={setLogin}
          text={role === "user" ? "User ID" : "Admin ID"}
          role={role}
        />
      </div>
    </>
  ) : (
    <div style={{ background: Color.background, minHeight: '100vh', color: Color.foreground }}>
      <Header title={title} />
      <nav
        id="topbar"
        style={{
          background: Color.gradientPrimary,
          maxWidth: "100vw",
        }}
      >
        {/* --- 4. WRAP THE HAMBURGER IN A CONDITION --- */}
        {!hideHamburgerOn.includes(location.pathname) && (
          <div
            className={`hamburger ${navOpen ? "navi" : ""}`}
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className="line" style={{ background: Color.foreground }}></div>
            <div className="line" style={{ background: Color.foreground }}></div>
            <div className="line" style={{ background: Color.foreground }}></div>
          </div>
        )}

        <Hnav />

        <button
          style={buttonStyle}
          className="Submit"
          onClick={() => setLogin(!login)}
        >
          {userId}
        </button>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            role === "user" ? (
              <UserHome
                role={role}
                userId={userId}
                login={login}
                setLogin={setLogin}
                title={title}
                navOpen={navOpen}
                setNavOpen={setNavOpen}
              />
            ) : (
              <AdminHome
                role={role}
                AdminId={userId}
                login={login}
                setLogin={setLogin}
                title={title}
                navOpen={navOpen}
                setNavOpen={setNavOpen}
              />
            )
          }
        />
        <Route path="/Ward-Details" element={<Ward />} />
        <Route path="/Contacts" element={<Contact />} />
      </Routes>
    </div>
  );
  
}

export default App;
