import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const GoBackPage = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/home/onboarding');
    }
    return <Box sx={{ display: "flex", flexDirection: "column", height: "600px", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div>Sorry!</div>
        <div>You have no access to this page
            before submitting your <b>onBoarding Application Page</b>!</div>
        <div>click here to go back to onBoarding Application</div>
        <IconButton onClick={handleBack}>
            <KeyboardBackspaceIcon sx={{ fontSize: "50px" }} />
        </IconButton>
    </Box>
}

export default GoBackPage;