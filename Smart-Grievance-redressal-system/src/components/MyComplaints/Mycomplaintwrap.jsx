import { Paper, Typography } from "@mui/material";
import { Mycomplainbox } from "./mycomplaintbox";
import download from './download.jpeg';
import { useEffect, useState } from "react";
// ✅ No props needed

export function Mycomplainwrap() {
  const [issues, setissues] = useState([]);
  const [status, setstatus] = useState("");

  async function getcomplaints() {
    const response = await fetch("http://localhost:3000/complaint/allcomplaints");
    const data = await response.json();
    setissues([...data]);
  }

  useEffect(() => {
    getcomplaints();
  }, []);

  return (
    <Paper elevation={1} sx={{ borderRadius: "16px", p: "2px", m: 2, overflow: "auto" }}>
      <Paper elevation={1} spacing={2} sx={{ padding: "10px", borderRadius: "16px", maxHeight: "400px", overflowY: "scroll" }}>
        {issues.length === 0
          ? <Typography variant="body1">No issues reported yet.</Typography>
          : issues.map((issue) => (
            <Mycomplainbox
              key={issue._id}
              label={issue.issueTitle}
              discription={issue.description}
              catogory={issue.category}
              setstatus={setstatus}
              status={issue.status}
              priority={issue.priority}
              date={issue.date}
              location={issue.location}
              response={issue.response}
              update={issue.update}
              selectedImage={issue.selectedImage}
              // ✅ user prop removed — not needed
            />
          ))
        }
      </Paper>
    </Paper>
  );
}