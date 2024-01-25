import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import { Box, Stepper, Step, StepLabel, Button, Typography, Chip } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import { LoadingComponent } from "./HRpages/EmployeeProfilesPage";
import ActiveStepContent from "./employeePages/ActiveStepContent";
import CompletedStepContent from "./employeePages/CompeletedStepContent";
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundColor: "#3f51b5",
        color: "#fff",
        fontSize: "1.5rem",
    }),
    ...(ownerState.completed && {
        backgroundColor: "#4caf50",
        color: "#fff",
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, icon } = props;
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }}>
            {completed ? <CheckCircleIcon /> : <span>{icon}</span>}
        </ColorlibStepIconRoot>
    );
}
function evaluateOptDocsStatus(optDocs) {
    console.log("fedkja optDocs: ", optDocs);
    let message = "all set";
    let currentStatus = "empty";
    if (optDocs.curDoc < optDocs.Docs.length) {
        currentStatus = optDocs.Status[optDocs.curStatus];
        if (currentStatus === "pending") {
            message = `Wait for HR to approve your OPT ${optDocs.Docs[optDocs.curDoc]}`;
        } else if (currentStatus === "empty") {
            message = `Please upload a copy of your OPT ${optDocs.Docs[optDocs.curDoc]} `;
        } else {
            message = (
                <>
                    Your uploading were <span style={{ color: "red" }}>rejected</span>. <br />
                    Here is the feedback:<br />
                    <Chip label={optDocs?.feedback} color="error" variant="outlined" /><br />
                    Plase <b>delete</b> the invalid files and <b>re-upload</b>
                    a new for your OPT {optDocs.Docs[optDocs.curDoc]}
                </>
            );
        }
    }
    return {
        message,
        currentStatus
    };
}
export default function VisaPage() {
    const optDocs_id = useSelector((state) => state.myProfile.profile?.optDocs);
    // const optDocs_id = "65b0ea2354ea27ba8bd0ecde";
    const [loading, setLoading] = React.useState(true);
    const [activeStep, setActiveStep] = React.useState(0);
    const [displayStep, setDisplayStep] = React.useState(0);
    const [optData, setOptData] = React.useState();
    const [fileLinks, setFileLinks] = React.useState([]);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const onBoardingStatus = useSelector((state) => state.myProfile.profile?.review_status);
    const [evaluatedMessage, setEvaluatedMessage] = React.useState();
    const [steps, setSteps] = React.useState([]);
    function getFileLinksForCurrentDoc(optDocs, curStep) {
        const currentDocType = optDocs.Docs[curStep];
        const fileLinks = optDocs[currentDocType] || [];
        return fileLinks;
    }
    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/opt/${optDocs_id}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const optDoc = await response.json();
            setOptData(optDoc);
            if (optDoc.curDoc < optDoc.Docs.length) {
                setFileLinks(getFileLinksForCurrentDoc(optDoc, optDoc.curDoc));
            }
            setActiveStep(optDoc.curDoc);
            setDisplayStep(optDoc.curDoc);
            setEvaluatedMessage(evaluateOptDocsStatus(optDoc));
            setIsDisabled(evaluateOptDocsStatus(optDoc).currentStatus === "pending");
            setSteps(optDoc.Docs);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleBack = () => {
        setDisplayStep((prevDisplayStep) => prevDisplayStep - 1);
    };
    const handleNext = () => {
        setDisplayStep((prevDisplayStep) => prevDisplayStep + 1);
    };

    const handleUpload = async () => {
        setLoading(true);
        try {
            const response = await axios.put('http://localhost:8080/api/opt/upload', {
                id: optDocs_id,
                docType: displayStep,
                links: fileLinks,
            });
            console.log('Upload successful', response.data);
            fetchData();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    const updateTempFiles = (type, file) => {
        if (type === "add") {
            setFileLinks([...fileLinks, file])
        }
        else {
            const filteredFiles = fileLinks.filter(f => f !== file);
            setFileLinks(filteredFiles);
        }
    }
    return (loading ? <LoadingComponent /> :
        <Box sx={{ width: "100%", height: "600px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? (
                <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }} >
                    All documents have been approved.
                </Typography>
            ) : (
                <Box sx={{ flex: 1 }}>
                    {displayStep === activeStep && <ActiveStepContent evaluatedMessage={evaluatedMessage} isDisabled={isDisabled} updateTempFiles={updateTempFiles} fileLinks={fileLinks} />}
                    {displayStep < activeStep && <CompletedStepContent curStep={displayStep} submittedFiles={getFileLinksForCurrentDoc(optData, displayStep)} />}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={displayStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        {displayStep < activeStep && (
                            <Button onClick={handleNext}>Next</Button>
                        )}
                        {displayStep === activeStep && (
                            <Button onClick={handleUpload} component="label" variant="contained" startIcon={<CloudUploadIcon />} disabled={isDisabled}>
                                Upload file
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );

}