import './App.css';
import color from './components/Color'
import Login from  './components/Login/Login';
//import Body from './components/Body';
import Nav from './components/Navigation/Nav';
import Mycomplain from './components/MyComplaints/Mycomplain';
import SubComplain from './components/Subcomplaint/SubComplain';

//import Logcontext from './components/logcontext';
import { useContext, useState } from 'react';
import { Link, Route, Routes, useLocation, } from 'react-router-dom';
import Color from './components/Color'

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
      color:Color.white,
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
          color:Color.secondary,
      }
      const buttonStyle={
          background:Color.secondary,
          color:Color.primary,
          width:"5%",
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
      {/* ... (Login screen is unchanged) ... */}
      <div id="toggle">
        <label
          className={`user${role === "user" ? "" : " closed"}`}
          style={{ backgroundColor: color.primary, color: color.secondary }}
          onClick={() => setRole("user")}
        >
          User
        </label>
        <label
          className={`admin${role === "user" ? " closed" : ""}`}
          style={{ backgroundColor: color.primary, color: color.secondary }}
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
    </>
  ) : (
    <div>
      <Header title={title} />
      <nav
        id="topbar"
        style={{
          background: color.primary,
          maxWidth: "100vw",
        }}
      >
        {/* --- 4. WRAP THE HAMBURGER IN A CONDITION --- */}
        {!hideHamburgerOn.includes(location.pathname) && (
          <div
            className={`hamburger ${navOpen ? "navi" : ""}`}
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className="line" style={{ background: color.secondary }}></div>
            <div className="line" style={{ background: color.secondary }}></div>
            <div className="line" style={{ background: color.secondary }}></div>
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
