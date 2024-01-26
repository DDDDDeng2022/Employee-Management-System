import React from "react";
import {
    List, ListItem, ListItemText, Button, Accordion, AccordionSummary, AccordionDetails,
    Typography, Chip, Box, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Tooltip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const update = (id, updateData) => axios.put(`http://localhost:8080/api/user/profileInfo/${id}`, updateData)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
const ApplicationList = ({ status, applications, updateApplications }) => {
    React.useEffect(() => { updateApplications() }, [])
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const filteredApplications = applications.filter((app) => app.review_status === status);
    console.log("filteredApplications: ", filteredApplications);
    const chipColor = {
        "Pending": "primary",
        "Rejected": "error",
        "Approved": "success"
    }
    const handleApprove = (id) => {
        const updateData = {
            review_status: true
        };
        update(id, updateData);
        updateApplications();
    };

    const handleReject = () => {
        setOpen(true);
    }
    const navigate = useNavigate();
    const handleView = (id, app) => {
        navigate(`/home/hiring/${id}`, { state: { id: app.id } });
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
                                            <Button variant="contained" color="primary" size="small" onClick={() => handleApprove(app.id)}>
                                                Approve
                                            </Button>
                                            <Button variant="contained" color="error" size="small" onClick={() => handleReject(app.id)}>
                                                Reject
                                            </Button>
                                            <ReviewSendPage open={open} handleClose={handleClose} updateApplications={updateApplications} id={app.id} />

                                        </>
                                    )}
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};

export function ReviewSendPage({ open, handleClose, updateApplications, id }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        update(id, { ...formJson, review_status: false });
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
                name="review_memo"
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
