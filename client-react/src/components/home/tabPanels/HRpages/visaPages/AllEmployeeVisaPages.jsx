import React from "react";
import { Typography, Collapse, Box, Table, TableBody, TableHead, TableRow, TableCell, Chip, TableContainer, InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { StyledTableCell, StyledTableRow } from "../EmployeeProfilesPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { calculateDaysRemaining } from "./InProcessPage";
import { VISA_COLUMNS } from "./InProcessPage";
import { NoResultComponent } from "../EmployeeProfilesPage";
import { handlePreviewClick } from "../../FilePreviewButton";

const COLUMNS = VISA_COLUMNS.slice(0, -1);
const transformOptDocs = (optDocs) => {
    let transformed = [];
    optDocs.Docs.forEach((docType, i) => {
        const status = i < optDocs.curDoc ? 'approved' :
            i === optDocs.curDoc ? optDocs.Status[optDocs.curStatus] :
                'empty';

        optDocs[docType].forEach(fileLink => {
            transformed.push({
                name: fileLink,
                status: status,
                docs_type: docType
            });
        });
    });

    return transformed;
};

export default function AllEmployeeVisaPages({ employees }) {
    const [searchTerm, setSearchTerm] = React.useState("");
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm)
    );
    return (
        <Box sx={{ paddingTop: "15px" }}>
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center", margin: "10px 100px" }} >
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Employees" onChange={handleSearch} />
                <IconButton type="button" >
                    <SearchIcon />
                </IconButton>
            </Paper>
            {filteredEmployees.length === 0 ? <NoResultComponent />
                : <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell />
                                {COLUMNS.map((column) => (
                                    <StyledTableCell key={column.id} align="center" style={{ minWidth: column.minWidth }} >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filteredEmployees.map((employee, index) => (
                                    <EmployeeRow key={index} employee={employee} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
        </Box >


    );
};
const ChipColor = (status) => {
    switch (status) {
        case "rejected":
            return "error";
        case "approved":
            return "success";
        default:
            return "info";
    }
};
export const getfileName = (filelink) => {
    const parsedUrl = new URL(filelink);
    const pathname = parsedUrl.pathname;
    const filename = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.indexOf("-", pathname.lastIndexOf("/")));
    return filename;
}
function EmployeeRow({ employee }) {
    const [open, setOpen] = React.useState(false);
    const files = transformOptDocs(employee.optDocs);
    const employeeData = {
        name: employee.name,
        visaTitle: employee.opt.title,
        startDate: employee.opt.start_date,
        endDate: employee.opt.end_date,
        daysRemaining: calculateDaysRemaining(employee.opt.end_date)
    };
    return (
        <React.Fragment>
            <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <StyledTableCell align="center">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </StyledTableCell>
                {COLUMNS.map((column, index) => (
                    <StyledTableCell key={index} align="center">
                        {employeeData[column.id]}
                    </StyledTableCell>
                ))}
            </StyledTableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Documents
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Filename</TableCell>
                                        <TableCell align="center">Process</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center" />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {files.map((file, index) => (
                                        <TableRow key={index}>
                                            <StyledTableCell align="center" sx={{ maxWidth: "200px" }}>{getfileName(file.name)}</StyledTableCell>
                                            <StyledTableCell align="center">{file.docs_type}</StyledTableCell>
                                            <StyledTableCell align="center"><Chip label={file.status} color={ChipColor(file.status)} variant="outlined" /></StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton onClick={() => {handlePreviewClick(file.name)}}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton component="a" href={file.name} download>
                                                    <GetAppIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}