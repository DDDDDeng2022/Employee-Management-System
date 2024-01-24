import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Button } from "@mui/material";
import { LineBox } from "../../ProfilePage";
import { createRegistration } from "../../../../../services/registrationApi";
export default function RegistrationSendPage({ open, handleClose, updateRegistors }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        // 调用生成token和发送邮件api
        const createReg = async (formJson) => {
            try {
                const registration = await createRegistration(formJson);
                updateRegistors();
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };
        createReg(formJson);
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
                Generate a private token and send a private Registration Link.
                Reminder: This link will expire in 3 hours.
            </DialogContentText>
            <LineBox>
                <TextField
                    autoFocus
                    required
                    name="first_name"
                    label="First Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    name="last_name"
                    label="Last Name"
                    fullWidth
                    variant="standard"
                /></LineBox>
            <TextField
                autoFocus
                required
                name="email"
                label="Email Address"
                type="email"
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