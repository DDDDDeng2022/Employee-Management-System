import React from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, StepIcon, StepButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GetAppIcon from '@mui/icons-material/GetApp'; // Download icon
import VisibilityIcon from '@mui/icons-material/Visibility'; // Eye icon
import DescriptionIcon from '@mui/icons-material/Description';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { getfileName } from "../HRpages/visaPages/AllEmployeeVisaPages";
import DeleteIcon from '@mui/icons-material/Delete';

const FileList = ({ files, updateTempFiles, isEditable }) => {
    console.log("filelist :", files);
    return (
        <List>
            {files.map((file, index) => {
                const fileName = getfileName(file);
                const fileExtension = fileName.split('.').pop(); // Extract file extension
                // Map file extensions to corresponding Material-UI icons
                const iconByExtension = {
                    pdf: <PictureAsPdfIcon color="error" />,
                    doc: <DescriptionIcon color="primary" />,
                    png: < PermMediaIcon color="success" />,
                    jpg: <PermMediaIcon />,
                    jpeg: <PermMediaIcon />

                    // Add more file types and their icons as needed
                };

                // Default icon for unknown file types
                const defaultIcon = <InsertDriveFileIcon />;

                // Choose the appropriate icon based on the file extension
                const fileIcon = iconByExtension[fileExtension.toLowerCase()] || defaultIcon;

                return (
                    <ListItem key={index}>
                        <ListItemIcon sx={{ minWidth: "0" }}>
                            {fileIcon}
                        </ListItemIcon>
                        <ListItemText primary={fileName} />
                        <Button size="small" sx={{ margin: '0 10px', padding: '3px' }}
                            startIcon={<GetAppIcon />}>Download</Button>
                        <Button size="small" sx={{ margin: '0 5px', padding: '3px' }}
                            startIcon={<VisibilityIcon />}>Preview</Button>
                        {isEditable &&
                            <Button size="small" sx={{ margin: '0 5px', padding: '3px' }}
                                startIcon={<DeleteIcon />} onClick={() => updateTempFiles("delete", file)}>Remove</Button>}
                    </ListItem>
                );
            })}
        </List>
    );
};

export default FileList;