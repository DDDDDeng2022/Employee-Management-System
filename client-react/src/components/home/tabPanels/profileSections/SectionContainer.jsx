import React from "react";
import { Box, Divider, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import apiCall from "../../../../services/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setMyProfile } from "../../../../redux/myProfileSlice";

export default function SectionContainer(props) {
    const { sectionName, formData, children, handleEdit, isDisabled, handleSubmit, reset, resetAvatar, isEmployeeProfile } = props;
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.user.user_id);
    const handleCloseComfirmDialog = (type) => {
        if (type === "yes") {
            reset(formData);
            resetAvatar && resetAvatar();
            handleEdit();
        }
        handleCancel();
    };
    const handleCancel = () => {
        setOpenConfirmDialog(!openConfirmDialog);
    };
    const onSubmit = async (data) => {
        console.log("Form Data: ", data);
        alert("form data: " + JSON.stringify(data, null, 2));
        try {
            await apiCall({
                url: `/api/user/info/${user_id}`,
                method: "POST",
                data,
            }).then((response) => {
                if (response.status === 201) {
                    dispatch(setMyProfile(response.info))
                    alert("Update Successfully");
                } else {
                    alert("Update failed");
                }
            });
        } catch (err) {
            console.log(`Error: ${err}`);
            alert(`Error: ${err}`);
        }
        handleEdit();
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: 'column', gap: "20px" }}>
            <Divider textAlign="left">
                <Typography sx={{ fontSize: "14px", color: "grey" }}>{sectionName}</Typography>
            </Divider>
            {children}
            {!isEmployeeProfile &&
                (isDisabled ? (
                    <Button onClick={handleEdit} variant="outlined" size="small" style={{ margin: '10px 0' }} >
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
                ))}
            < ComfirmDialog openComfirmDialog={openConfirmDialog} handleCloseComfirmDialog={handleCloseComfirmDialog} />
        </Box>
    );
}

const ComfirmDialog = (props) => {
    const { openComfirmDialog, handleCloseComfirmDialog } = props;
    return (
        <Dialog open={openComfirmDialog} onClose={handleCloseComfirmDialog}>
            <DialogTitle>Comfirm Dialog</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    All the changes will be discarded. If you click “Yes”, all
                    changes should be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size="small" variant="contained" color="primary" onClick={() => handleCloseComfirmDialog("yes")}>Yes</Button>
                <Button size="small" variant="contained" color="error" onClick={() => handleCloseComfirmDialog("no")}>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
};
