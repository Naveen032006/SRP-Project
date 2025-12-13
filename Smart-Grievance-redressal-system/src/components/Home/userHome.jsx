

import { useEffect, useState } from "react";
import Nav from "../Navigation/Nav";
import OverView from "../Overview/OverView";
import SubComplain from "../Subcomplaint/SubComplain";
import Mycomplain from "../MyComplaints/Mycomplain";
import { Analytics } from "@mui/icons-material";

function UserHome({
  role,
  userId,
  login,
  setLogin,
  title,
  navOpen,
  setNavOpen,
}) {
  const [section, setSection] = useState("overview");

  
  
  const [issues, setIssues] = useState([]);
 

  return (
    <div className="UserBody">
      {navOpen && (
        <Nav
          section={section}
          setSection={setSection}
          setnavi={setNavOpen}
          login={login}
          loginset={setLogin}
          role={role}
        />
      )}

      <div
        className="BodyBody11"
        style={{ opacity: navOpen ? 0.5 : 1 }}
        onClick={() => setNavOpen(false)}
      >
        {section === "overview" && (
          <div className="content1">
            <OverView userid={userId} role={role} issues={issues} />
          </div>
        )}
        {section === "subcomplain" && (
          <div className="content1">
            <SubComplain issues={issues} />
          </div>
        )}
        {section === "mycomplain" && (
          <div className="content2">
            <Mycomplain role={role} issues={issues} />
          </div>
        )}
        {section === "analytics" && (
          <div className="content3">
            <Analytics issues={issues} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHome;
