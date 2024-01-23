import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton, Box } from "@mui/material";
import { NameSection } from '../profileSections/NameSection';
import { AddressSection } from '../profileSections/AddressSecttion';
import { ContactSection } from '../profileSections/ContactSection';
import { EmergencyContactSection } from '../profileSections/EmergencySection';
import { EmploymentSection } from '../profileSections/EmploymentSection';

export default function DetailedProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const profile = location.state?.profile;
    console.log(profile);
    const handleBack = () => {
        navigate(-1);
    };
    return <div>
        <IconButton onClick={handleBack}>
            <KeyboardBackspaceIcon />
        </IconButton>
        <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "auto" }}>
            <NameSection formData={profile} isEmployeeProfile={true} />
            <AddressSection formData={profile.address} isEmployeeProfile={true} />
            <ContactSection formData={profile} isEmployeeProfile={true} />
            <EmploymentSection formData={profile.opt} isEmployeeProfile={true} />
            <EmergencyContactSection formData={profile.emergency_contact} isEmployeeProfile={true} />
            {/* <DocumentsSection formData={profile.documentSection} />  */}
        </Box>
    </div>
}