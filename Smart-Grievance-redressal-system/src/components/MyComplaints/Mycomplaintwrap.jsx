import { Paper, Typography } from "@mui/material";
import { Mycomplainbox } from "./mycomplaintbox";
import { useEffect, useState } from "react";

export function Mycomplainwrap({ filter }) {
    const [issues, setIssues] = useState([]);

    async function getcomplaints() {
        const response = await fetch("http://localhost:3000/complaint/allcomplaints");
        const data = await response.json();
        setIssues(data);
    }

    useEffect(() => {
        getcomplaints();
    }, []);

    // ✅ Apply all 3 filters + sort in one pipeline
    const filteredIssues = issues
        // 1. filter by complaint id (issueTitle contains the search text)
        .filter(issue =>
            filter.id
                ? issue.issueTitle?.toLowerCase().includes(filter.id.toLowerCase())
                : true
        )
        // 2. filter by category
        .filter(issue =>
            filter.category
                ? issue.category === filter.category
                : true
        )
        // 3. filter by status
        .filter(issue =>
            filter.status
                ? issue.status?.toLowerCase() === filter.status.toLowerCase()
                : true
        )
        // 4. sort by date
        .sort((a, b) => {
            if (!filter.order) return 0;
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return filter.order === "Newest First"
                ? dateB - dateA   // newest first = descending
                : dateA - dateB;  // oldest first = ascending
        });

    return (
        <Paper elevation={1} sx={{ borderRadius: "16px", p: "2px", m: 2, overflow: "auto" }}>
            <Paper elevation={1} spacing={2} sx={{ padding: "10px", borderRadius: "16px", maxHeight: "400px", overflowY: "scroll" }}>
                {filteredIssues.length === 0
                    ? <Typography variant="body1">No issues found.</Typography>
                    : filteredIssues.map((issue) => (
                        <Mycomplainbox
                            key={issue._id}
                            label={issue.issueTitle}
                            discription={issue.description}
                            catogory={issue.category}
                            status={issue.status}
                            priority={issue.priority}
                            date={issue.date}
                            location={issue.location}
                            response={issue.response}
                            update={issue.update}
                            selectedImage={issue.selectedImage}
                        />
                    ))
                }
            </Paper>
        </Paper>
    );
}
