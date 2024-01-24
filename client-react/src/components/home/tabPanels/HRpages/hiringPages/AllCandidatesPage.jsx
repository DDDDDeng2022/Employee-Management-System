import React from "react";
import { CircularProgress, Box, Button, Table, TableBody, TableHead, TableRow, Chip, TableContainer, InputBase, IconButton, Paper, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import RegistrationSendPage from "./RegistrationSendPage";
import { getRegistors } from "../../../../../services/registrationApi";
import { StyledTableCell, StyledTableRow } from "../EmployeeProfilesPage";
const AllCandidatesPage = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [registors, setRegistors] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const fetchRegistors = async () => {
        try {
            const fetchedRegistors = await getRegistors();
            setRegistors(fetchedRegistors);
            setLoading(false);
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
    return (loading ?
        <Box sx={{ width: "100%", height: "700px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress size="100px" />
        </Box >
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
                                                ? (value
                                                    ? <Chip label="Submitted" color="success" sx={{ fontSize: { xs: "10px", sm: "15px" } }} />
                                                    : <Chip label="Not Submitted" color="error" sx={{ fontSize: { xs: "10px", sm: "15px" } }} />
                                                )
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
            <RegistrationSendPage open={open} handleClose={handleClose} updateRegistors={fetchRegistors} />
        </Box >
    )
};

export default AllCandidatesPage;
