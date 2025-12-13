import { useState } from "react";
import { Staff } from "../Staffmanagement/Staff";
import Nav from "../Navigation/Nav";
import OverView from "../Overview/OverView";
import Mycomplain from "../MyComplaints/Mycomplain";
import { Analytics } from "@mui/icons-material";
import Resolve from "../resolver/Resolve";

function AdminHome({
  role,
  AdminId,
  login,
  setLogin,
  title,
  navOpen,
  setNavOpen,
}) {
  // Navigation section
  const [section, setSection] = useState("overview");

  // ---------------------------
  // FRONTEND-ONLY ISSUES DATA
  // ---------------------------
  const [issues, setIssues] = useState([
    {
      _id: "1",
      issueTitle: "Broken streetlight on Main Street",
      description:
        "The streetlight has been broken for over a week, making the area unsafe at night.",
      category: "Infrastructure",
      status: "Pending",
      priority: "High",
      createdAt: "2024-01-15",
      location: "123 Main Street, Downtown",
      likeCount: 5,
      user: { userid: "user01" },
    },
    {
      _id: "2",
      issueTitle: "Broken Watertank on Main Street",
      description:
        "The watertank has been broken for over a week, causing water shortage.",
      category: "Basic Needs",
      status: "Pending",
      priority: "Low",
      createdAt: "2024-12-20",
      location: "123 Main Street, Downtown",
      likeCount: 2,
      user: { userid: "user02" },
    },
  ]);

  return (
    <div className="AdminBody">
      {/* Side Navigation */}
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

      {/* Main Content Area */}
      <div
        className="BodyBody11"
        style={{ opacity: navOpen ? 0.5 : 1 }}
        onClick={() => setNavOpen(false)}
      >
        {/* OVERVIEW */}
        {section === "overview" && (
          <div className="content1">
            <OverView userid={AdminId} role={role} issues={issues} />
          </div>
        )}

        {/* RESOLVE COMPLAINTS */}
        {section === "resolve" && (
          <div className="content1">
            <Resolve AdminId={AdminId} issues={issues} />
          </div>
        )}

        {/* MY COMPLAINTS */}
        {section === "mycomplain" && (
          <div className="content2">
            <Mycomplain role={role} issues={issues} />
          </div>
        )}

        {/* ANALYTICS */}
        {section === "analytics" && (
          <div className="content3">
            <Analytics issues={issues} />
          </div>
        )}

        {/* STAFF MANAGEMENT */}
        {section === "staff" && (
          <div className="content3">
            <Staff />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHome;
