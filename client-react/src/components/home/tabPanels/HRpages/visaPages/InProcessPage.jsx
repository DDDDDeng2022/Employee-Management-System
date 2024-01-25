import React from "react";
import { Box, Button, Table, TableBody, TableHead, TableRow, TableContainer, Paper } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../EmployeeProfilesPage";
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

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
                                                {/* todo:
                                                        还不确定file列在哪
                                                        preview
                                                 */}
                                                <Button>view files</Button>
                                                <OPTActions id={employee.opt_id} fetchEmployees={fetchEmployees} />
                                                {/* {employee.files.map((doc, index) => (
                                                    <Tooltip key={index} title={doc.name}>
                                                        <a
                                                            href={doc.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {doc.name}
                                                        </a>
                                                    </Tooltip>
                                                ))}, */}
                                            </Box>}
                                    </StyledTableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box >

}

const OPTActions = ({ id, fetchEmployees }) => {
    const [disabled, setDisabled] = React.useState(false);
    const handleApprove = async () => {
        setDisabled(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/opt/approval/${id}`);
            console.log('Document Approved:', response.data);
            fetchEmployees();
        } catch (error) {
            console.error('Error Approving Document:', error);
        }
    };
    const handleReject = async () => {
        setDisabled(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/opt/rejection/${id}`);
            console.log('Document Rejected:', response.data);
            fetchEmployees();
        } catch (error) {
            console.error('Error Rejecting Document:', error);
        }
    }
    return <Box sx={{ display: "flex" }}>
        <Button onClick={handleApprove} disabled={disabled} color="success" size="small">approve</Button>
        <Button onClick={handleReject} disabled={disabled} color="error" size="small">reject</Button>
    </Box>
}