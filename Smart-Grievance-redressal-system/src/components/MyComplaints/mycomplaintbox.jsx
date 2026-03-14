import {
    Box, Button, Chip, Dialog, Paper, Stack, Typography, DialogTitle,
    DialogContent, DialogActions, IconButton, TextField,
} from "@mui/material";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { alpha } from '@mui/material/styles';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import Color from '../Color';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export function Mycomplainbox({ label, discription, catogory, status, priority, date, location, response, update, selectedImage }) {
    const [pop, setpop] = useState(false);
    const [SStatus, setSStatus] = useState(status);
    const [updatepop, setupdatepop] = useState(false);

    // ✅ Added responseText state so the TextField is controlled
    const [responseText, setResponseText] = useState("");

    // ✅ cancelled state to hide the card when user cancels
    const [cancelled, setCancelled] = useState(false);

    function statushandle(newstatus) {
        setSStatus(newstatus);
        setupdatepop(false); // ✅ close dialog after updating
    }

    // ✅ implemented — hides the complaint card locally
    function deletecomplaint() {
        setCancelled(true);
    }

    const getcolor = (s) => {
        switch (s?.toLowerCase()) {
            case "pending": return "warning";
            case "in progress": return "info";
            case "resolved": return "success";
            case "rejected": return "error";
            default: return "default";
        }
    };

    const getPcolor = (p) => {
        switch (p?.toLowerCase()) {
            case "high": return "error";
            case "medium": return "warning";
            case "low": return "info";
            default: return "default";
        }
    };

    const getIcon = (s) => {
        switch (s?.toLowerCase()) {
            case "pending": return AccessTimeIcon;
            case "in progress": return ReportProblemOutlinedIcon;
            case "resolved": return DoneOutlineIcon;
            case "rejected": return CancelIcon;
            default: return AccessTimeIcon;
        }
    };

    const Icon = getIcon(SStatus);
    const district = location?.district;
    const taluk = location?.taluk;
    const ward = location?.ward;

    // ✅ Don't render if cancelled
    if (cancelled) return null;

    return (
        <>
            <Paper elevation={1} sx={{ borderRadius: "16px", p: 2, m: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Icon color={getcolor(SStatus)} fontSize="small" />
                        <Typography variant="h5" fontWeight="bold">{label}</Typography>
                    </Stack>
                    <Chip
                        label={priority}
                        variant="outlined"
                        sx={{
                            backgroundColor: (theme) => alpha(theme.palette[getPcolor(priority)].main, .8),
                            color: Color.secondary
                        }}
                    />
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <RoomOutlinedIcon color="disabled" fontSize="small" />
                        <Typography variant="body2">{ward}, {taluk}, {district}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <CalendarTodayOutlinedIcon color="disabled" fontSize="small" />
                        <Typography variant="body2">{date}</Typography>
                    </Stack>
                    <Chip label={catogory} variant="outlined" />
                </Stack>

                <Stack>
                    <Typography variant="body1" sx={{ padding: "5px" }}>{discription}</Typography>
                </Stack>

                {update && (
                    <Stack spacing={0.5} direction="column" sx={{
                        backgroundColor: "#e3edfcff", color: "blue",
                        borderRadius: "10px", padding: "5px", paddingLeft: "10px",
                        border: "1px solid #c3b7fcff"
                    }}>
                        <Typography variant="caption" fontWeight="bold" color="info">Management Response:</Typography>
                        <Typography variant="caption" sx={{ paddingLeft: 2 }}>{response}</Typography>
                    </Stack>
                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", padding: "5px" }}>
                    {/* ✅ Shows live SStatus (updates when admin changes it) */}
                    <Chip label={SStatus} color={getcolor(SStatus)} variant="filled" />
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Button
                            variant="outlined" size="medium"
                            sx={{ borderRadius: 3, textTransform: "none" }}
                            startIcon={<RemoveRedEyeOutlinedIcon />}
                            color="info"
                            onClick={() => setpop(true)}
                        >
                            View details
                        </Button>
                        {/* ✅ Cancel button now calls deletecomplaint */}
                        <Button
                            variant="outlined" size="medium"
                            sx={{ borderRadius: 3, textTransform: "none" }}
                            startIcon={<CancelOutlinedIcon />}
                            color="error"
                            onClick={deletecomplaint}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            {/* View Details Dialog - unchanged */}
            <Dialog open={pop} onClose={() => setpop(false)} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ color: "black" }}>{label}</Typography>
                        <Chip label={priority} variant="outlined" sx={{
                            backgroundColor: (theme) => alpha(theme.palette[getPcolor(priority)].main, .8),
                            color: Color.secondary
                        }} />
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap' }}>
                            <Chip label={SStatus} color={getcolor(SStatus)} variant="filled" />
                            <Chip label={catogory} variant="outlined" />
                        </Box>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <RoomOutlinedIcon color="disabled" fontSize="small" />
                                <Typography variant="body2">{ward}, {taluk}, {district}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <CalendarTodayOutlinedIcon color="disabled" fontSize="small" />
                                <Typography variant="body2">{date}</Typography>
                            </Stack>
                        </Stack>
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Description:</Typography>
                            <Typography variant="body1" sx={{ padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
                                {discription}
                            </Typography>
                        </Box>
                        {selectedImage && (
                            <img src={selectedImage} alt="Complaint attachment"
                                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                            />
                        )}
                        {update && (
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Management Response:</Typography>
                                <Stack spacing={0.5} sx={{
                                    backgroundColor: "#e3edfcff", borderRadius: "10px",
                                    padding: "10px", border: "1px solid #c3b7fcff"
                                }}>
                                    <Typography variant="body2">{response}</Typography>
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setpop(false)} variant="contained">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Update Status Dialog */}
            <Dialog open={updatepop} onClose={() => setupdatepop(false)} fullWidth maxWidth="xs">
                <Box sx={{ padding: "1rem" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "black" }}>
                            Update Complaint Status
                        </Typography>
                        <IconButton onClick={() => setupdatepop(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="caption" sx={{ color: "grey" }}>
                        Update the Status of Complaint: {label}
                    </Typography>

                    <Stack sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ padding: "0.5rem" }}>Response (Optional)</Typography>
                        {/* ✅ TextField is now controlled */}
                        <TextField
                            variant="outlined"
                            label="Response"
                            placeholder="Provide the response to the civilian"
                            color="info"
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                        />
                    </Stack>

                    <Box sx={{ padding: "1rem 0.5rem 0.5rem 3rem", display: "flex", justifyContent: "space-between" }}>
                        {/* ✅ All 3 buttons now call statushandle with correct value */}
                        <Button
                            variant="outlined" size="small" color="error"
                            sx={{ textTransform: "none" }}
                            onClick={() => statushandle("pending")}
                        >
                            Mark Pending
                        </Button>
                        <Button
                            variant="outlined" size="small"
                            sx={{ textTransform: "none" }}
                            onClick={() => statushandle("in progress")}
                        >
                            Mark In Progress
                        </Button>
                        <Button
                            variant="contained" size="small" color="success"
                            sx={{ textTransform: "none" }}
                            onClick={() => statushandle("resolved")}
                        >
                            Mark Resolved
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
