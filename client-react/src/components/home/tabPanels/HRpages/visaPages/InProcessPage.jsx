import React from "react";
import { Box, Button, Table, TableBody, TableHead, TableRow, TableContainer, Paper } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../EmployeeProfilesPage";
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField } from "@mui/material";
import FileList from "../../employeePages/FileList";
export const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
};
export const VISA_COLUMNS = [
    { id: "name", label: "Name" },
    { id: "visaTitle", label: "Work Authorization" },
    { id: "startDate", label: "Authorization Start" },
    { id: "endDate", label: "Authorization End" },
    { id: "daysRemaining", label: "Days Remaining" },
    { id: "nextStep", label: "nextStep" },
];
export default function InProcessPage({ employees, fetchEmployees }) {
    const filteredEmployees = employees.filter((item) => item.optDocs.curDoc <= 3);
    const [files, setFiles] = React.useState([]);
    const transformEmployees = (employees) => {
        return employees.map(employee => {
            let nextStep = '';
            const curDocType = employee.optDocs.Docs[employee.optDocs.curDoc];
            const status = employee.optDocs.Status[employee.optDocs.curStatus];
            if (status === 'pending') {
                nextStep = 'Wait for HR approval';
            } else if (status === 'rejected' || status === 'empty') {
                nextStep = `Waiting for Employee to submit ${curDocType} file`;
            }
            const files = employee.optDocs[curDocType] ? employee.optDocs[curDocType] : [];
            return {
                opt_id: employee.optDocs._id,
                name: employee.name,
                visaTitle: employee.opt.title,
                startDate: employee.opt.start_date,
                endDate: employee.opt.end_date,
                daysRemaining: calculateDaysRemaining(employee.opt.end_date),
                nextStep: nextStep,
                files: files,
            };
        });
    };
    const inProcessingdata = transformEmployees(filteredEmployees);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (f) => {
        setFiles(f)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return <Box sx={{ p: 2 }}>
        <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {VISA_COLUMNS.map((column) => (
                            <StyledTableCell key={column.id} align="center"  >
                                {column.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inProcessingdata.map((employee, index) => (
                        <TableRow hover key={index}>
                            {VISA_COLUMNS.map((column) => {
                                let value = employee[column.id];
                                return (
                                    <StyledTableCell key={column.id} align="center">
                                        {column.id === "daysRemaining"
                                            ? calculateDaysRemaining(
                                                employee.endDate
                                            )
                                            : value}

                                        {column.id === "nextStep" && value === "Wait for HR approval"
                                            && <Box>

                                                <Button onClick={() => handleClickOpen(employee.files)}>view files</Button>
                                                <OPTActions id={employee.opt_id} fetchEmployees={fetchEmployees} />

                                            </Box>}
                                    </StyledTableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {files.length > 0 && <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Uploaded files </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <FileList files={files} isEditable={false} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>close</Button>
            </DialogActions>
        </Dialog>
        }
    </Box >

}

const FileDialog = ({ open, handleClose, files }) => {
    console.log("dialog files open:", open)
    console.log("dialogfiles: ", files);
    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uploaded files </DialogTitle>
        <DialogContent>
            <DialogContentText>
                <FileList files={files} isEditable={false} />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>close</Button>
        </DialogActions>
    </Dialog>
}

const OPTActions = ({ id, fetchEmployees }) => {
    const [openFeedbackDialog, setOpenFeedbackDialog] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const handleApprove = async () => {
        setDisabled(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/opt/approval/${id}`);
            console.log('Document Approved:', response.data);
            fetchEmployees();
            setDisabled(false);
        } catch (error) {
            console.error('Error Approving Document:', error);
        }
    };
    const handleReject = async () => {
        setOpenFeedbackDialog(true);
    }
    const handleCloseFeedbackDialog = () => {
        setOpenFeedbackDialog(!openFeedbackDialog);
        fetchEmployees();
    };
    return <Box sx={{ display: "flex" }}>
        <Button onClick={handleApprove} disabled={disabled} color="success" size="small">approve</Button>
        <Button onClick={handleReject} disabled={disabled} color="error" size="small">reject</Button>
        < FeedbackDialog openFeedbackDialog={openFeedbackDialog} handleCloseFeedbackDialog={handleCloseFeedbackDialog} id={id} />

    </Box>
}

export function FeedbackDialog({ openFeedbackDialog, handleCloseFeedbackDialog, id }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        try {
            const response = await axios.put(`http://localhost:8080/api/opt/rejection/${id}`, formJson);
            console.log('Document Rejected:', response.data);
        } catch (error) {
            console.error('Error Rejecting Document:', error);
        }
        handleCloseFeedbackDialog();
    }
    return <Dialog
        open={openFeedbackDialog}
        onClose={handleCloseFeedbackDialog}
        PaperProps={{
            component: 'form',
            onSubmit: handleSubmit
        }}
    >
        <DialogTitle sx={{ backgroundColor: "#227fe9", color: "white" }}>Invitation</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please type in the reason why the file is rejected:
            </DialogContentText>
            <TextField
                autoFocus
                required
                name="feedback"
                label="Feedback"
                fullWidth
                variant="standard"
            />

        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleCloseFeedbackDialog()}> cancel</Button>
            <Button type="submit">Send</Button>
        </DialogActions>
    </Dialog>

}