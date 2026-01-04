import React, { useState, useEffect } from "react";

// --- MUI Imports ---
import {
  Box,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
  Card,
  CardContent,
  Avatar,
  Divider,
  Container,
  CardMedia,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  ThumbUp as ThumbUpIcon,
  Upgrade as UpgradeIcon,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { SubissueBox } from "../Subcomplaint/subissuebox";

// -----------------------
// ComplaintList Component
// -----------------------
function ComplaintList({ complaints, selectedId, onComplaintSelect }) {
  return (
    <Paper
      elevation={2}
      sx={{
        maxHeight: "calc(100vh - 220px)",
        overflow: "auto",
        borderRadius: 4,
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
        <Typography variant="h6">Complaints Queue</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {(complaints || []).map((complaint) => (
          <Box
            key={complaint._id}
            onClick={() => onComplaintSelect && onComplaintSelect(complaint)}
            sx={{ cursor: "pointer", mb: 1.5 }}
          >
            <SubissueBox
              label={complaint.issueTitle || "Untitled"}
              discription={complaint.description || ""}
              catogory={complaint.category || "General"}
              status={complaint.status || "Pending"}
              priority={complaint.priority || "Medium"}
              date={
                complaint.createdAt
                  ? new Date(complaint.createdAt).toLocaleDateString()
                  : "N/A"
              }
              location={complaint.location || "Unknown"}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

// -----------------------
// TakeActionForm Component
// -----------------------
function TakeActionForm({ complaint, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    status: complaint?.status || "Pending",
    assignTo: complaint?.assignTo || "Unassigned",
    resolutionTime: complaint?.resolutionTime || "",
    actionTaken: complaint?.actionTaken || "",
    notes: complaint?.notes || "",
  });

  useEffect(() => {
    // Keep form in sync if complaint changes while modal is open
    setFormData({
      status: complaint?.status || "Pending",
      assignTo: complaint?.assignTo || "Unassigned",
      resolutionTime: complaint?.resolutionTime || "",
      actionTaken: complaint?.actionTaken || "",
      notes: complaint?.notes || "",
    });
  }, [complaint]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // onUpdate returns boolean success in original pattern; here it's synchronous
    const success = await onUpdate(complaint._id, {
      ...formData,
    });

    if (success) {
      onClose();
    }
  };

  return (
    <>
      <DialogTitle>
        Take Action: {complaint.issueTitle}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Update Status</InputLabel>
              <Select
                labelId="status-select-label"
                name="status"
                value={formData.status}
                label="Update Status"
                onChange={handleChange}
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"In-Progress"}>In-Progress</MenuItem>
                <MenuItem value={"Resolved"}>Resolved</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="staff-select-label">Assign to Staff</InputLabel>
              <Select
                labelId="staff-select-label"
                name="assignTo"
                value={formData.assignTo}
                label="Assign to Staff"
                onChange={handleChange}
              >
                <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                <MenuItem value={"Team Alpha (Roads)"}>
                  Team Alpha (Roads)
                </MenuItem>
                <MenuItem value={"Team Bravo (Sanitation)"}>
                  Team Bravo (Sanitation)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="resolutionTime"
              label="Estimated Resolution Time"
              value={formData.resolutionTime}
              onChange={handleChange}
              placeholder="e.g., 2-3 days, 1 week"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="actionTaken"
              label="Action Taken"
              multiline
              rows={4}
              value={formData.actionTaken}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="notes"
              label="Additional Notes (Optional)"
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="success"
          startIcon={<UpgradeIcon />}
        >
          Update Complaint
        </Button>
      </DialogActions>
    </>
  );
}

// -----------------------
// ComplaintDetail Component
// -----------------------
function ComplaintDetail({ complaint, onUpdate }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  if (!complaint) {
    return (
      <Paper
        sx={{
          height: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "text.secondary",
          borderRadius: 4,
        }}
      >
        <AssignmentIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Select a Complaint
        </Typography>
        <Typography variant="body1">
          Choose a complaint from the list to view details and take action
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 220px)",
      }}
    >
      <Card sx={{ mb: 2, borderRadius: 4 }}>
        {complaint.image && (
          <CardMedia
            component="img"
            height="240"
            image={complaint.image}
            alt={complaint.issueTitle}
          />
        )}
        <CardContent>
          <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
            <Chip label={complaint.category || "General"} color="error" size="small" />
            
          </Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {complaint.issueTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {complaint.description}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "primary.light", mr: 1.5 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Reported By
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="600">
                    {complaint.user?.userid || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "secondary.light", mr: 1.5 }}>
                  <CalendarTodayIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Reported On
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="600">
                    {complaint.createdAt
                      ? new Date(complaint.createdAt).toLocaleString()
                      : "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "success.light", mr: 1.5 }}>
                  <LocationOnIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="600">
                    {complaint.location}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2, borderRadius: 4 }}>
        <CardContent>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<EditIcon />}
            onClick={handleOpenModal}
          >
            Take Action
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>{/* Activity timeline stub */}</CardContent>
      </Card>

      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <TakeActionForm complaint={complaint} onClose={handleCloseModal} onUpdate={onUpdate} />
      </Dialog>
    </Box>
  );
}

// -----------------------
// Resolve (Frontend-only)
// -----------------------
export default function Resolve({ AdminId, issues = [], onUpdateSuccess }) {
  // Local copy of issues so we can update front-end only
  const [localIssues, setLocalIssues] = useState([...issues]);
  const [selectedComplaint, setSelectedComplaint] = useState(
    localIssues.length ? localIssues[0] : null
  );

  // Keep localIssues in sync when parent provides new issues prop
  useEffect(() => {
    setLocalIssues([...issues]);
    // if selected exists, try to refresh it from new issues list
    setSelectedComplaint((prev) => {
      if (!prev) return issues.length ? issues[0] : null;
      const refreshed = issues.find((c) => c._id === prev._id) || null;
      return refreshed;
    });
  }, [issues]);

  // Update handler: updates localIssues and selectedComplaint (no backend)
  const handleUpdateComplaint = async (complaintId, updatedFields) => {
    try {
      setLocalIssues((prev) =>
        prev.map((c) =>
          c._id === complaintId ? { ...c, ...updatedFields } : c
        )
      );

      // Update selected complaint if it's the same one
      setSelectedComplaint((prev) =>
        prev && prev._id === complaintId ? { ...prev, ...updatedFields } : prev
      );

      // Optional callback to parent that a change happened
      if (typeof onUpdateSuccess === "function") {
        try {
          onUpdateSuccess(); // parent can re-fetch or react if desired
        } catch (e) {
          // ignore parent callback errors
          // keep frontend-only behavior intact
        }
      }

      // Return true to indicate success (so modal can close)
      return true;
    } catch (error) {
      console.error("Failed to update complaint locally:", error);
      return false;
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f4f6f8",
        height: "calc(100vh - 120px)",
        overflow: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom fontWeight="600">
          Resolve Complaints
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Review complaint details and take action to resolve citizen issues
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={5} md={4} sx={{ minWidth: "30rem" }}>
            <ComplaintList
              complaints={localIssues}
              selectedId={selectedComplaint?._id}
              onComplaintSelect={setSelectedComplaint}
            />
          </Grid>

          <Grid item xs={12} sm={7} md={8} sx={{ minWidth: "40rem" }}>
            <ComplaintDetail
              complaint={selectedComplaint}
              onUpdate={handleUpdateComplaint}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
