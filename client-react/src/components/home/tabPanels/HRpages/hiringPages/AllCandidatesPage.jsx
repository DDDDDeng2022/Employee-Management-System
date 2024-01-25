import React from "react";
import { CircularProgress, Box, Button, Table, TableBody, TableHead, TableRow, Chip, TableContainer, InputBase, IconButton, Paper, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import RegistrationSendPage from "./RegistrationSendPage";
import { getRegistors } from "../../../../../services/registrationApi";
import { StyledTableCell, StyledTableRow } from "../EmployeeProfilesPage";
import { LoadingComponent, NoResultComponent } from "../EmployeeProfilesPage";
import apiCall from "../../../../../services/apiCall";

const AllCandidatesPage = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [registors, setRegistors] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const fetchRegistors = async () => {
        try {
            await getRegistors().then(async fetchedRegistors => {
                await Promise.all(
                    fetchedRegistors.map(async (registor) => {
                        await apiCall({ url: "/api/auth/decode", method: "POST", data: { token: registor.token }})
                            .then(decoded => {
                                registor.expires_at = decoded.exp;
                        })
                    })
                )
                setRegistors(fetchedRegistors);
            }).then(() => {
                setLoading(false);
            });
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };
    React.useEffect(() => {
        fetchRegistors();
    }, [])
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const COLUMNS = [
        { id: "email", label: "Email" },
        { id: "name", label: "Name" },
        { id: "link", label: "Link" },
        { id: "status", label: "Status" },
    ];
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };
    const filteredRows = registors.filter((row) => {
        return (
            row.name.toLowerCase().includes(searchTerm) ||
            row.link.toLowerCase().includes(searchTerm) ||
            row.email.toLowerCase().includes(searchTerm)
        );
    });
    const isExpried = (expires_at) => {
        if (expires_at === undefined) {
            return true;
        }
        const isTokenExpired = expires_at < Date.now() / 1000;
        if (!isTokenExpired) {
            return false;
        } else {
            return true;
        }
        // return true;
    }
    const resendEmail = async (email) => {
        const curr_employee = registors.find(user => user.email === email);
        await apiCall({ url: "/api/registration/new", method: "POST", data: { email, first_name: curr_employee.first_name, last_name: curr_employee.last_name }})
        fetchRegistors();
        console.log("resend a link to ", email);
    }
    const renderChip = (value, link, email, expires_at) => {
        return value
            ? <Chip label="Submitted" color="success" sx={{ fontSize: { xs: "10px", sm: "15px" } }} />
            : isExpried(expires_at)
                ? <>
                    <Chip label="Expried" sx={{ fontSize: { xs: "10px", sm: "15px" } }} />
                    <Button onClick={() => resendEmail(email)} >Resend</Button>
                </>
                : <Chip label="Not Submitted" color="error" sx={{ fontSize: { xs: "10px", sm: "15px" } }} />
    }

    return (loading ?
        <LoadingComponent />
        :
        <Box sx={{ paddingTop: "15px" }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "10px", alignItems: "center", justifyContent: "center" }}>
                <Paper
                    sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
                >
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Employees" onChange={handleSearch} />
                    <IconButton type="button" >
                        <SearchIcon />
                    </IconButton>

                </Paper>
                <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<AddIcon />}>
                    Invite new
                </Button>
            </Box>
            {filteredRows.length === 0 ? <NoResultComponent /> :
                <TableContainer sx={{ maxHeight: 450, marginTop: "20px" }} >
                    <Table stickyHeader>
                        <TableHead >
                            <TableRow>
                                {COLUMNS.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align="center"
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <StyledTableRow hover tabIndex={-1} key={row.email}>
                                    {COLUMNS.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <StyledTableCell key={column.id} align="center" sx={{ maxWidth: "100px" }}>
                                                {column.id === "status"
                                                    ? (renderChip(value, row.link, row.email, row.expires_at))
                                                    : <Tooltip title={value}>{value}</Tooltip>
                                                }
                                            </StyledTableCell>
                                        );
                                    })}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <RegistrationSendPage open={open} handleClose={handleClose} updateRegistors={fetchRegistors} />
        </Box >
    )
};

export default AllCandidatesPage;

