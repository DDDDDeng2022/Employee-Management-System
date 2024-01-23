import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { NameSection } from "./profileSections/NameSection";
import { AddressSection } from "./profileSections/AddressSecttion";
import { ContactSection } from "./profileSections/ContactSection";
import { EmploymentSection } from "./profileSections/EmploymentSection";
import { EmergencyContactSection } from "./profileSections/EmergencySection";

export default function OnboardingPage() {
    const profile = useSelector((state) => state.myProfile.profile);
    return (
        <div>
            <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "auto" }}>
                <NameSection formData={profile.nameSection} />
                <AddressSection formData={profile.addressSection} />
                <ContactSection formData={profile.contactSection} />
                <EmploymentSection formData={profile.visa} />
                <EmergencyContactSection formData={profile.emergencySection} />
                {/* <DocumentsSection formData={profile.documentSection} />  */}
            </Box>
        </div>
    );
}
