import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton, Box, Button } from "@mui/material";
import OnboardingPage from '../../OnboardingPage';
import { ReviewSendPage } from './ApplicationList';
export default function ApplicationPage() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleApprove = () => {
        //    todo 添加修改application的API
    };
    const handleReject = () => {
        setOpen(true);
    }
    const navigate = useNavigate();
    const location = useLocation();
    const application = location.state?.application;
    const status = location.state?.status;
    const handleBack = () => {
        navigate(-1);
    };
    return <div>
        <IconButton onClick={handleBack}>
            <KeyboardBackspaceIcon />
        </IconButton>
        <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "auto" }}>
            <OnboardingPage isEmployeeProfile={true} />
        </Box>
        {status === "Pending" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary" size="small" onClick={handleApprove}>
                    Approve
                </Button>
                <Button variant="contained" color="error" size="small" onClick={handleReject}>
                    Reject
                </Button>
            </Box>
        )}
        <ReviewSendPage open={open} handleClose={handleClose} />

    </div>
}