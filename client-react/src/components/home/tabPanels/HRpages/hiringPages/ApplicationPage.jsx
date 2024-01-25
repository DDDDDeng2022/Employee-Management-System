import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton, Box } from "@mui/material";
import OnboardingPage from '../../OnboardingPage';
export default function ApplicationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.id;
    console.log("application_id: ", id);
    const handleBack = () => {
        navigate(-1);
    };

    return <div>
        <IconButton onClick={handleBack}>
            <KeyboardBackspaceIcon />
        </IconButton>
        <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "auto" }}>
            <OnboardingPage isEmployeeProfile={true} profile_id={id} />
        </Box>
    </div>
}