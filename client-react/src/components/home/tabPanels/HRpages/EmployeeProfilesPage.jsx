import React from "react";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { CircularProgress, TableBody, Table, Paper, Box, InputBase, IconButton, Typography, Chip, Link, TableRow, TablePagination, TableHead, TableContainer } from "@mui/material";
import { getProfiles } from "./api";
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { styled, createTheme } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";

const COLUMNS = [
    { id: "fullName", label: "fullName" },
    { id: "ssn", label: "ssn" },
    { id: "workAuthTitle", label: "Work Authorization Title" },
    { id: "cell_phone_number", label: "Phone Number" },
    { id: "email", label: "Email" },
];

const preprocessAndSortRows = (rows) => {
    return rows.sort((a, b) => a.last_name.localeCompare(b.last_name));
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#3157db",
        color: theme.palette.common.white,
        whiteSpace: "nowrap",
        [theme.breakpoints.down('sm')]: {
            padding: "5px",
            fontSize: "12px"
        },
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
            padding: "5px",
            fontSize: "12px"
        },
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export default function EmployeeProfilesPage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick = (id, row) => {
        navigate(`/home/employee/${id}`, { state: { profile: row } });
    }
    React.useEffect(() => {
        const fetchAllProfiles = async () => {
            try {
                const fetchedCProfiles = await getProfiles();
                const transformedData = preprocessAndSortRows(fetchedCProfiles).map(item => ({
                    ...item,
                    fullName: `${item.first_name} ${item.last_name}`,
                    workAuthTitle: item.visa_type,
                }));
                setRows(transformedData);
                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };
        fetchAllProfiles();
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };
    const filteredRows = rows.filter((row) => {
        return (
            row.fullName.toLowerCase().includes(searchTerm) ||
            row.workAuthTitle.toLowerCase().includes(searchTerm) ||
            row.ssn.toLowerCase().includes(searchTerm) ||
            row.cell_phone_number.toLowerCase().includes(searchTerm) ||
            row.email.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <Paper>
            {loading ? <Box sx={{ width: "100%", height: "700px", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress size="100px" /></Box> :
                location.pathname === "/home/employee" ?
                    <Box sx={{ display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "10px", alignItems: "center", justifyContent: "center" }}>
                            <Typography noWrap component="div">Total Employee Profiles
                                <Chip label={rows.length} color="primary" variant="outlined" sx={{ marginLeft: "10px" }} /></Typography>
                            <Paper
                                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
                            >
                                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Employees" onChange={handleSearch} />
                                <IconButton type="button" >
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
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
                                    {filteredRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                                                    {COLUMNS.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <StyledTableCell key={column.id} align="center">
                                                                {column.id === "fullName" ? (
                                                                    <Link onClick={() => { handleClick(row.fullName, row) }}>{row.fullName}</Link>
                                                                ) : (
                                                                    value
                                                                )}
                                                            </StyledTableCell>
                                                        );
                                                    })}
                                                </StyledTableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[8, 10, 25]}
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box> :
                    <Outlet />
            }
        </ Paper>

    );
}
