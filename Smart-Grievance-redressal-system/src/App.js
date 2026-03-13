import './App.css';
import Color from './components/Color';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import { Route, Routes, useLocation } from 'react-router-dom';
import Hnav from './components/Navigation/Hnav';
import AdminHome from './components/Home/AdminHome';
import UserHome from './components/Home/userHome';
import Ward from './components/warddetails/Ward';
import Contact from './components/contactDetails/Contact';
import { useUI } from "./context/Navcontext";
import { Authuse } from './context/Authcontext';

function Header() {
  const { role } = Authuse();
  const title = role === "Admin" ? "Welcome, Resolver" : "Welcome Citizen";
  return (
    <h1 style={{ color: Color.foreground, textAlign: "center", margin: "0" }}>
      Hi! {title}
    </h1>
  );
}

function App() {
  const { login, setLogin, role, UserId } = Authuse();
  const { navOpen, setNavOpen } = useUI();
  const location = useLocation();

  const hideHamburgerOn = ["/Ward-Details", "/Contacts"];

  const buttonStyle = {
    background: "#e1e6e7ed",
    color: Color.foreground,
    width: "10%",
    marginTop: ".5%",
    height: "50px",
    flex: "0 1 auto",
    borderRadius: "25px",
    borderWidth: "0",
    cursor: "pointer",
    fontSize: "100%",
    marginLeft: "auto",
  };

  return login ? (
    <>
      <div
        id="login-container"
        style={{
          border: `1px solid ${Color.border}`,
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '480px',
          margin: '32px auto',
          background: Color.surface,
          boxShadow: `0 2px 8px ${Color.muted}20`,
        }}
      >
        <Login />
      </div>
    </>
  ) : (
    <div style={{ background: Color.background, minHeight: '100vh', color: Color.foreground }}>
      <Header />
      <nav id="topbar" style={{ background: Color.gradientPrimary, maxWidth: "100vw" }}>
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
        <button style={buttonStyle} className="Submit" onClick={() => setLogin(true)}>
          {UserId}
        </button>
      </nav>
      <Routes>
        <Route
          path="/"
          element={role === "user" ? <UserHome /> : <AdminHome />}
        />
        <Route path="/Ward-Details" element={<Ward />} />
        <Route path="/Contacts" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;