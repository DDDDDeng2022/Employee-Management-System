import React from "react";
import { Box, Typography } from "@mui/material";
import FileList from "./FileList";

const CompletedStepContent = ({ curStep, submittedFiles }) => {
    console.log("submittedFiles: ", submittedFiles);
    return <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", border: "lightgray solid 2px", margin: "20px 100px", width: "60vw", height: '60vh' }}>
        <Typography sx={{ mt: 2, mb: 1 }}>This is Step: {curStep + 1}</Typography>
        <FileList files={submittedFiles} />
    </Box>
}
export default CompletedStepContent;