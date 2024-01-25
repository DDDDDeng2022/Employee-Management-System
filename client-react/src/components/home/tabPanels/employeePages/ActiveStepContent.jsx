import React from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, StepIcon, StepButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import FileList from "./FileList";
import { VisuallyHiddenInput } from "../profileSections/NameSection";

const ActiveStepContent = ({ evaluatedMessage, isDisabled, updateTempFiles, fileLinks }) => {
    const [fileLink, setFileLink] = React.useState();
    const uploadDocument = async (file) => {
        const formData = new FormData();
        formData.append('document', file);
        try {
            const response = await fetch("http://localhost:8080/api/user/uploadDocument", {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.documentUrl;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };
    const handleChoose = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const documentUrl = await uploadDocument(file);
                setFileLink(documentUrl);
                updateTempFiles("add", documentUrl);
                console.log("added: ", documentUrl);
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
    };
    return <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "lightgray solid 2px", width: "100%", height: "100%" }}>
        <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>{evaluatedMessage.message}</Typography>
        <Button component="label" size="small" variant="contained" disabled={isDisabled} >
            Choose files
            <VisuallyHiddenInput type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={handleChoose} />
        </Button>
        {fileLinks.length > 0 && (
            <Box>
                <Typography variant="caption" color="textSecondary">
                    Selected File:
                </Typography>
                <FileList files={fileLinks} updateTempFiles={updateTempFiles} isEditable={!isDisabled} />
            </Box>
        )}
    </Box>

};


export default ActiveStepContent;