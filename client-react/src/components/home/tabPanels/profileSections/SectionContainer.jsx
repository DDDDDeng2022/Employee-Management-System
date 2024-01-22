import React from 'react';
import { Box, Divider, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SectionContainer(props) {
    const { sectionName, formData, children, handleEdit, isDisabled, handleSubmit, reset, resetAvatar } = props;
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const handleCloseComfirmDialog = (type) => {
        if (type === "yes") {
            reset(formData);
            resetAvatar && resetAvatar();
            handleEdit()
        }
        handleCancel();
    }
    const handleCancel = () => {
        setOpenConfirmDialog(!openConfirmDialog);
    }
    const onSubmit = async (data) => {
        console.log("Form Data: ", data);
        alert("form data: " + JSON.stringify(data, null, 2));
        handleEdit();
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: 'column', gap: "20px" }}>
            <Divider textAlign="left">
                <Typography sx={{ fontSize: "14px", color: "grey" }}>{sectionName}</Typography>
            </Divider>
            {children}
            {isDisabled ? (
                <Button onClick={handleEdit} variant="outlined" size="small" style={{ margin: '10px 0' }}>
                    Edit
                </Button>
            ) : (
                <Box sx={{ display: "flex" }}>
                    <Button variant="contained" color="error" size="small" onClick={() => setOpenConfirmDialog(true)}
                        sx={{ flex: 1 }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" size="small" color="primary" sx={{ flex: 1 }}>
                        Save
                    </Button>
                </Box>
            )}
            <ComfirmDialog openComfirmDialog={openConfirmDialog} handleCloseComfirmDialog={handleCloseComfirmDialog} />

        </Box>
    );
}

const ComfirmDialog = (props) => {
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
