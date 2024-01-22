import React from 'react';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NameSection } from './profileSections/NameSection';
import { AddressSection } from './profileSections/AddressSecttion';
import { ContactSection } from './profileSections/ContactSection';
import { EmploymentSection } from './profileSections/EmploymentSection';
import { EmergencyContactSection } from './profileSections/EmergencySection';
export default function ProfilePage() {
    const profile = useSelector((state) => state.myProfile.profile);
    return (

        <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "auto" }}>
            <NameSection formData={profile.nameSection} />
            <AddressSection formData={profile.addressSection} />
            <ContactSection formData={profile.contactSection} />
            <EmploymentSection formData={profile.visa} />
            <EmergencyContactSection formData={profile.emergencySection} />
            {/* <DocumentsSection formData={profile.documentSection} />  */}
        </Box>
    );
}

export const LineBox = ({ children }) => {
    return <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: { xs: "10px", sm: "20px" } }}>
        {children}
    </Box>
}

export const ComfirmDialog = (props) => {
    const { openComfirmDialog, handleCloseComfirmDialog } = props
    return <Dialog
        open={openComfirmDialog}
        onClose={handleCloseComfirmDialog}
    >
        <DialogTitle>
            Comfirm Dialog
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                All the changes will be discarded.
                If you click “Yes”, all changes should be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button size="small" variant="contained" color="primary" onClick={() => handleCloseComfirmDialog("yes")}>Yes</Button>
            <Button size="small" variant="contained" color="error" onClick={() => handleCloseComfirmDialog("no")}>
                No
            </Button>
        </DialogActions>
    </Dialog>
}