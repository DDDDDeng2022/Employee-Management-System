import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton, Box, Button } from "@mui/material";
import { NameSection } from '../../profileSections/NameSection';
import { AddressSection } from '../../profileSections/AddressSecttion';
import { ContactSection } from '../../profileSections/ContactSection';
import { EmergencyContactSection } from '../../profileSections/EmergencySection';
import { EmploymentSection } from '../../profileSections/EmploymentSection';
import { ReviewSendPage } from './ApplicationList';
export default function ApplicationPage() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleApprove = () => {
        //    todo 添加修改application的API
        handleBack();
    };
    const handleReject = () => {
        setOpen(true);
        handleBack();
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
        {/* todo: 换成onboarding application page */}
        <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "auto" }}>
            <NameSection formData={application} isEmployeeProfile={true} />
            <AddressSection formData={application.address} isEmployeeProfile={true} />
            <ContactSection formData={application} isEmployeeProfile={true} />
            <EmploymentSection formData={application.opt} isEmployeeProfile={true} />
            <EmergencyContactSection formData={application.emergency_contact} isEmployeeProfile={true} />
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