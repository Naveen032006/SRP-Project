import { useState } from "react";
import { Staff } from "../Staffmanagement/Staff";
import Color from "../Color";
import OverView from "../Overview/OverView";
import Mycomplain from "../MyComplaints/Mycomplain";
import Resolve from "../resolver/Resolve";
import { useIssue } from "../../context/Issuecontext";
import { useUI } from "../../context/Navcontext";

function AdminHome() {
  const { navOpen, setNavOpen, section, setSection } = useUI(); // ✅ context only
  const { issues } = useIssue();

  const Sidebar = () => {
    const { setNavOpen, section, setSection } = useUI();
    const items = [
      { id: "overview", label: "Overview", icon: "home" },
      { id: "resolve", label: "Resolve Complaints", icon: "file" },
      { id: "allcomplain", label: "All Complaints", icon: "list" },
      { id: "staff", label: "Staff", icon: "users" },
      { id: "analytics", label: "Analytics", icon: "chart" },
    ];

    const Icon = ({ name, active }) => {
      const stroke = active ? Color.white : Color.emerald500;
      const fill = active ? Color.white : "none";
      if (name === "home")
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      if (name === "file")
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      if (name === "list")
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      if (name === "users")
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v18H3z" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    };

    return (
      <aside style={{
        width: 220, padding: 16, background: Color.surface ?? "#fff",
        borderRight: `1px solid ${Color.border}`, borderTopRightRadius: 12,
        borderBottomRightRadius: 12, boxShadow: `0 8px 24px ${Color.muted}20`,
        display: "flex", flexDirection: "column", gap: 8,
        position: "fixed", left: 16, top: 16, bottom: 16, zIndex: 60,
      }}>
        <div style={{ padding: "6px 6px 12px 6px" }}>
          <div style={{ fontWeight: 700, color: Color.foreground, marginBottom: 10 }}>Smart City</div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((it) => {
            const active = it.id === section;
            return (
              <button
                key={it.id}
                onClick={() => {
                  setSection(it.id);
                  setNavOpen(false); // ✅ was setnavi(false) — now uses context
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  width: "100%", padding: "10px 12px", borderRadius: 18, border: "none",
                  background: active ? `linear-gradient(90deg, ${Color.emerald500}, ${Color.teal500})` : "transparent",
                  color: active ? Color.white : Color.foreground,
                  cursor: "pointer", textAlign: "left",
                  boxShadow: active ? `0 6px 18px ${Color.muted}33` : "none",
                }}
              >
                <div style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={it.icon} active={active} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{it.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    );
  };

  return (
    <div className="AdminBody">
      {navOpen && <Sidebar />}
      <div
        className="BodyBody11"
        style={{ opacity: navOpen ? 0.5 : 1, color: Color.foreground }}
        onClick={() => setNavOpen(false)}
      >
        {section === "overview" && <div className="content1"><OverView /></div>}
        {section === "resolve" && <div className="content1"><Resolve issues={issues} /></div>}
        {section === "allcomplain" && <div className="content2"><Mycomplain /></div>}
        {section === "staff" && <div className="content3"><Staff /></div>}
        {section === "analytics" && <div className="content3">{/* Analytics */}</div>}
      </div>
    </div>
  );
}

export default AdminHome;