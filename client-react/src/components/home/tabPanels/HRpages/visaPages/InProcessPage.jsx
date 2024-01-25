import React from "react";
import { CircularProgress, Typography, Collapse, TextField, Box, Button, Table, TableBody, TableHead, TableRow, TableCell, Chip, TableContainer, InputBase, IconButton, Paper, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getRegistors } from "../../../../../services/registrationApi";
import { StyledTableCell, StyledTableRow } from "../EmployeeProfilesPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GetAppIcon from '@mui/icons-material/GetApp'; // 下载图标
import VisibilityIcon from '@mui/icons-material/Visibility'; // 预览图标
import { Document, Page } from 'react-pdf';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import PDFViewer from 'pdf-viewer-reactjs';
export default function InProcessPage({ employees }) {
    console.log("employe: ", employees);
    const filteredEmployees = employees.filter((item) => item.optDocs.curDoc <= 3);
    console.log("filteredEmployees: ", filteredEmployees);
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
    const calculateDaysRemaining = (endDate) => {
        const end = new Date(endDate);
        const now = new Date();
        return Math.ceil((end - now) / (1000 * 60 * 60 * 24)); // 计算剩余天数
    };

    const getNestedValue = (obj, path) => {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };
    const hh = transformEmployees(filteredEmployees);
    console.log("hh: ", hh);
    const COLUMNS = [
        { id: "name", label: "Name" },
        { id: "visaTitle", label: "Work Authorization" },
        { id: "startDate", label: "Authorization Start" },
        { id: "endDate", label: "Authorization End" },
        { id: "daysRemaining", label: "Days Remaining" },
        { id: "nextStep", label: "nextStep" },
    ];

    return <Box sx={{ p: 2 }}>
        <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {COLUMNS.map((column) => (
                            <StyledTableCell key={column.id} align="center" style={{ minWidth: column.minWidth }} >
                                {column.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hh.map((employee) => (
                        <TableRow hover key={employee.id}>
                            {COLUMNS.map((column) => {
                                let value = employee[column.id];
                                return (
                                    <StyledTableCell key={column.id} align="center">
                                        {column.id === "daysRemaining"
                                            ? calculateDaysRemaining(
                                                employee.endDate
                                            )
                                            : value}

                                        {column.id === "nextStep" && value === "Wait for HR approval"
                                            && <Box><Button>view files</Button>
                                                <Button>approve</Button>
                                                <Button>rejecte</Button>
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
        {/* <iframe src='http://localhost:8080/uploads/test1.pdf-1706139087429-386978677' width="500" height="600"></iframe> */}
        <iframe src="http://docs.google.com/gview?url=http://localhost:8080/uploads/Project_B.pdf-1706097746768-165330044https://github.com/Toblerone0629/Employee-Management-System/raw/main/uploads/Project_B.pdf-1706086970840-104517075&embedded=true" style={{ width: "500px", height: "600px" }} frameborder="0"></iframe>
        <iframe src="https://viewscreen.githubusercontent.com/view/pdf?browser=chrome&amp;bypass_fastly=true&amp;color_mode=auto&amp;commit=3027d74fc4c4396fa204a3d8440e2cdb6e039937&amp;device=unknown_device&amp;docs_host=https%3A%2F%2Fdocs.github.com&amp;enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f546f626c65726f6e65303632392f456d706c6f7965652d4d616e6167656d656e742d53797374656d2f333032376437346663346334333936666132303461336438343430653263646236653033393933372f50726f6a6563742d422e706466&amp;logged_in=true&amp;nwo=Toblerone0629%2FEmployee-Management-System&amp;path=Project-B.pdf&amp;platform=mac&amp;repository_id=744288475&amp;repository_type=Repository&amp;version=120#abaf117b-1880-4f74-8081-38ddf9b8aa63" sandbox="allow-scripts allow-same-origin allow-top-navigation" title="File display">Viewer requires iframe.</iframe>
        <div data-hpc="true" data-host="https://viewscreen.githubusercontent.com" data-type="pdf"><iframe src="https://viewscreen.githubusercontent.com/view/pdf?browser=chrome&amp;bypass_fastly=true&amp;color_mode=auto&amp;commit=3027d74fc4c4396fa204a3d8440e2cdb6e039937&amp;device=unknown_device&amp;docs_host=https%3A%2F%2Fdocs.github.com&amp;enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f546f626c65726f6e65303632392f456d706c6f7965652d4d616e6167656d656e742d53797374656d2f333032376437346663346334333936666132303461336438343430653263646236653033393933372f50726f6a6563742d422e706466&amp;logged_in=true&amp;nwo=Toblerone0629%2FEmployee-Management-System&amp;path=Project-B.pdf&amp;platform=mac&amp;repository_id=744288475&amp;repository_type=Repository&amp;version=120#abaf117b-1880-4f74-8081-38ddf9b8aa63" sandbox="allow-scripts allow-same-origin allow-top-navigation" name="abaf117b-1880-4f74-8081-38ddf9b8aa63" title="File display" class="Box-sc-g0xbh4-0 kRMcOk">Viewer requires iframe.</iframe></div>
        <PDFPreview
        // file='http://localhost:8080/uploads/test1.pdf-1706139087429-386978677'
        />
    </Box >

}



function PDFPreview() {
    const [numPages, setNumPages] = React.useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document file="https://viewscreen.githubusercontent.com/view/pdf?browser=chrome&amp;bypass_fastly=true&amp;color_mode=auto&amp;commit=3027d74fc4c4396fa204a3d8440e2cdb6e039937&amp;device=unknown_device&amp;docs_host=https%3A%2F%2Fdocs.github.com&amp;enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f546f626c65726f6e65303632392f456d706c6f7965652d4d616e6167656d656e742d53797374656d2f333032376437346663346334333936666132303461336438343430653263646236653033393933372f50726f6a6563742d422e706466&amp;logged_in=true&amp;nwo=Toblerone0629%2FEmployee-Management-System&amp;path=Project-B.pdf&amp;platform=mac&amp;repository_id=744288475&amp;repository_type=Repository&amp;version=120#abaf117b-1880-4f74-8081-38ddf9b8aa63" onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    );
}



