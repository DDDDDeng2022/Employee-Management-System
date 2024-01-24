import React from "react";
import {
    List, ListItem, ListItemText, Button, Accordion, AccordionSummary, AccordionDetails,
    Typography, Chip, Box, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Tooltip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from 'react-router-dom';

const ApplicationList = ({ status, applications, updateApplications }) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const filteredApplications = applications.filter((app) => app.review_status === status);
    const chipColor = {
        "Pending": "primary",
        "Rejected": "error",
        "Approved": "success"
    }
    const handleApprove = () => {
        //    todo 添加修改application的API
        updateApplications();
    };
    const handleReject = () => {
        setOpen(true);
    }
    const navigate = useNavigate();
    const handleView = (id, app) => {
        navigate(`/home/hiring/${id}`, { state: { application: app, status: status } });
    }
    return (
        <Accordion defaultExpanded={status === "Pending"}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ marginRight: "10px" }}>{status} Applications</Typography>
                <Chip label={filteredApplications.length} color={chipColor[status]} variant="outlined" size="small" />
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {filteredApplications.map((app, index) => (
                        <ListItem key={index}>
                            <Box sx={{ display: "flex", gap: "10px", flexDirection: { sm: "column", md: "row" }, width: "100%", }}>
                                <ListItemText primary={`${app.first_name} ${app.last_name}`} secondary={app.email} />
                                <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <Button variant="outlined" color="primary" size="small" sx={{ minWidth: "80px" }} onClick={() => handleView(app.first_name, app)}>
                                        <Tooltip title="View Application">
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                View Application
                                            </span>
                                        </Tooltip>
                                    </Button>
                                    {status === "Pending" && (
                                        <>
                                            <Button variant="contained" color="primary" size="small" onClick={handleApprove}>
                                                Approve
                                            </Button>
                                            <Button variant="contained" color="error" size="small" onClick={handleReject}>
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <ReviewSendPage open={open} handleClose={handleClose} updateApplications={updateApplications} />
            </AccordionDetails>
        </Accordion>
    );
};

export function ReviewSendPage({ open, handleClose, updateApplications }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        //    todo 添加修改application的API
        updateApplications && updateApplications();
        handleClose();
    }
    return <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit
        }}
    >
        <DialogTitle sx={{ backgroundColor: "#227fe9", color: "white" }}>Invitation</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please type in the reason why the application is rejected:
            </DialogContentText>
            <TextField
                autoFocus
                required
                name="email"
                label="Feedback"
                fullWidth
                variant="standard"
            />

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Send</Button>
        </DialogActions>
    </Dialog>

}
export default ApplicationList;
