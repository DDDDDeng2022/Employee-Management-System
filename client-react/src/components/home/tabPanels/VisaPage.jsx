// import React from "react";
// import { useEffect, useState } from 'react';
// import PropTypes from "prop-types";
// import Typography from "@mui/material/Typography";
// import { MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper, Button, Input } from '@mui/material';
// import Box from "@mui/material/Box";
// import PDFViewer from 'pdf-viewer-reactjs';//npm install pdf-viewer-reactjs
// // import axios from "axios";
// // import { Page, Document} from 'react'
// import { VisuallyHiddenInput } from "./profileSections/NameSection";
// const steps = ["Receipt", "EAD", "I983", "I20"];
// const RECEIPT = 0;
// const EAD = 1;
// const I983 = 2;
// const I20 = 3;
// const EMPTY = 0;
// const PENDING = 1;
// const APPROVED = 2;
// const REJECTED = 3;
// const status = ["Upload your document", "Pending for reviewing", "Your document is approved", "Your document is rejected"];
// const queryId = "65aefc287acdeb5c29a0e765";
// export default function VisaPage() {
//     const [activeStep, setActiveStep] = React.useState(0);
//     const [curStep, setCurStep] = React.useState({});
//     const [selectedFile, setSelectedFile] = React.useState(null);
//     const [fileLink, setFileLink] = React.useState();
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(
//                     `http://localhost:8080/api/opt/${queryId}`
//                 );
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 const doc = data.curStep;
//                 setCurStep(doc);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, [fileLink]); // Run once when the component mounts

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };
//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleReset = () => {
//         setActiveStep(0);
//     };
//     const uploadDocument = async (file) => {
//         const formData = new FormData();
//         formData.append('document', file);
//         try {
//             const response = await fetch("http://localhost:8080/api/user/uploadDocument", {
//                 method: 'POST',
//                 body: formData,
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             return data.documentUrl;
//         } catch (error) {
//             console.error('Error:', error);
//             throw error;
//         }
//     };
//     const handleUpload = async (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             try {
//                 const documentUrl = await uploadDocument(file);
//                 console.log("documentUrl: ", documentUrl);
//                 setSelectedFile(file);
//                 setFileLink(documentUrl);
//             } catch (error) {
//                 console.error('Upload error:', error);
//             }
//         }
//     };

//     // const handleUpload = async () => {
//     //     try {
//     //         console.log("test selected file: ", selectedFile)
//     //         const formData = new FormData();
//     //         // Append file to formData with 'file' as the key
//     //         formData.append('file', selectedFile);
//     //         // Append id and docType to formData
//     //         formData.append('id', queryId);
//     //         formData.append('docType', curStep.curDoc);
//     //         // Make a POST request with axios
//     //         const response = await axios.put('http://localhost:8080/api/opt/upload', formData, {
//     //             headers: {
//     //                 'Content-Type': 'multipart/form-data',
//     //             },
//     //         });
//     //         // const response = await axios.put('http://localhost:8080/api/opt/upload', {
//     //         //     id: queryId,
//     //         //     docType: curStep.curDoc,
//     //         //     link: selectedFile,
//     //         // });
//     //         console.log('Upload successful', response.data);
//     //     } catch (error) {
//     //         // Handle errors
//     //         console.error('Error uploading file:', error);
//     //     }
//     // };

//     const onFileChange = (event) => {
//         const file = event.target.files[0];
//         setSelectedFile(file);
//     };
//     ////////////////////////////////////////////////////////////////////////////////////////////////
//     const renderPdfViewer = () => {
//         console.log("test opt data: ", curStep);
//         let displayDoc = "";
//         let displayStatus = 0;
//         switch (activeStep) {
//             case RECEIPT:
//                 displayDoc = curStep.Receipt;
//                 if (activeStep < curStep.curDoc) {
//                     displayStatus = APPROVED;
//                 } else if (activeStep === curStep.curDoc) {
//                     displayStatus = curStep.curStatus;
//                 }
//                 break;
//             case EAD:
//                 displayDoc = curStep.EAD;
//                 if (activeStep < curStep.curDoc) {
//                     displayStatus = APPROVED;
//                 } else if (activeStep === curStep.curDoc) {
//                     displayStatus = curStep.curStatus;
//                 }
//                 break;
//             case I983:
//                 displayDoc = curStep.I983;
//                 if (activeStep < curStep.curDoc) {
//                     displayStatus = APPROVED;
//                 } else if (activeStep === curStep.curDoc) {
//                     displayStatus = curStep.curStatus;
//                 }
//                 break;
//             case I20:
//                 displayDoc = curStep.I20;
//                 if (activeStep < curStep.curDoc) {
//                     displayStatus = APPROVED;
//                 } else if (activeStep === curStep.curDoc) {
//                     displayStatus = curStep.curStatus;
//                 }
//                 break;
//             default:
//                 break;
//         }

//         return (
//             <Box>
//                 <img src={displayDoc} alt="pics of doc" />
//                 <Typography>current status: {status[displayStatus]}</Typography>
//                 <Button></Button>

//             </Box>

//         );
//     };





//     ////////////////////////////////////////////////////////////////////////////////////////////////

//     const NaviButtons = () => {
//         {/* handle the <Next> and <Back> buttons */ }
//         if (activeStep === steps.length) {
//             return (
//                 <React.Fragment>
//                     {/* <Typography sx={{ mt: 2, mb: 1 }}> */}
//                     {/* All Visa Documents are approved - Congratulations,you&apos;ve done the process! */}
//                     {/* </Typography> */}
//                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                         <Box sx={{ flex: '1 1 auto' }} />
//                         <Button onClick={handleReset}>Reset</Button>
//                     </Box>
//                 </React.Fragment>
//             )
//         };
//         if (activeStep < curStep.curDoc) {
//             return (
//                 <React.Fragment>
//                     {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
//                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                         <Button
//                             color="inherit"
//                             disabled={activeStep === 0}
//                             onClick={handleBack}
//                             sx={{ mr: 1 }}
//                         >
//                             Back
//                         </Button>
//                         <Box sx={{ flex: '1 1 auto' }} />

//                         <Button onClick={handleUpload} style={{ display: activeStep === curStep.curDoc ? 'inline-block' : 'none' }}>
//                             Upload
//                         </Button>


//                         <Button onClick={handleNext}>
//                             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                         </Button>
//                     </Box>
//                 </React.Fragment>
//             )
//         } else if (activeStep >= curStep.curDoc) {
//             return (
//                 <React.Fragment>
//                     {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
//                     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                         <Button
//                             color="inherit"
//                             disabled={activeStep === 0}
//                             onClick={handleBack}
//                             sx={{ mr: 1 }}
//                         >
//                             Back
//                         </Button>
//                         <Box sx={{ flex: '1 1 auto' }} />

//                         <Button onClick={handleUpload} style={{ display: activeStep === curStep.curDoc ? 'inline-block' : 'none' }}>
//                             Upload
//                         </Button>


//                         <Button onClick={handleNext}>
//                             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                         </Button>
//                     </Box>
//                 </React.Fragment>
//             )
//         }

//     }


//     console.log("fileLink: ", fileLink);
//     ////////////////////////////////////////////////////////////////////////////////////////////////

//     return (
//         <Box sx={{ width: '100%' }}>
//             {/* handle the stepper bar */}
//             <Stepper activeStep={activeStep}>
//                 {steps.map((label, index) => {
//                     const stepProps = {};
//                     const labelProps = {};
//                     return (
//                         <Step key={label} {...stepProps}>
//                             <StepLabel {...labelProps}>{label}</StepLabel>
//                         </Step>
//                     );
//                 })}
//             </Stepper>
//             {/* handle the middle content box */}
//             <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", border: "lightgray solid 2px", margin: "20px 100px", width: "60vw", height: '60vh' }}>
//                 <Typography sx={{ mt: 2, mb: 1 }}>Your current Step: {steps[activeStep]}</Typography>
//                 {renderPdfViewer()}
//                 <Box style={{ display: activeStep === curStep.curDoc ? "block" : "none" }}>
//                     {/* File input component */}
//                     {/* <Input style={{ display: activeStep === curStep.curDoc ? "inline-block" : "none" }}
//                         type="file"
//                         accept=".pdf, .jpg, .jpeg, .png"
//                         onChange={onFileChange}
//                     /> */}
//                     <Button color="error"
//                         component="label"
//                         style={{ border: '1px solid gray', backgroundColor: 'lightgray', color: 'black', height: '30px' }}
//                     >
//                         Choose a file
//                         <VisuallyHiddenInput type="file" onChange={handleUpload} />
//                     </Button>
//                     {/* Upload button - visible only if curStep.curDoc === activeStep */}
//                     <Button sx={{ backgroundColor: "red" }}
//                         component="label"

//                         style={{ border: '1px solid gray', backgroundColor: 'lightgray', color: 'black', height: '30px' }}
//                     >
//                         Upload
//                     </Button>
//                     {/* {fileLink && <PDFViewer document={{ url: fileLink }} />} */}
//                     <div> {fileLink}</div>
//                     {/* Display selected file name */}
//                     {selectedFile && (
//                         <Typography variant="caption" color="textSecondary">
//                             Selected File: {selectedFile.name}
//                         </Typography>
//                     )}
//                 </Box>
//             </Box>
//             <NaviButtons />

//         </Box>
//     );
// }


// todo: 1.修改后端相关文件为[]


import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import { Box, Stepper, Step, StepLabel, Button, Typography, StepIcon, StepButton } from "@mui/material";
import Check from "@mui/icons-material/Check";
import PDFViewer from 'pdf-viewer-reactjs';//npm install pdf-viewer-reactjs
import { useEffect, useState } from 'react';
// import { Page, Document} from 'react'
import axios from "axios";

import { VisuallyHiddenInput } from "./profileSections/NameSection";
const steps = ["Receipt", "EAD", "I983", "I20"];
const RECEIPT = 0;
const EAD = 1;
const I983 = 2;
const I20 = 3;
const EMPTY = 0;
const PENDING = 1;
const APPROVED = 2;
const REJECTED = 3;
const status = ["Upload your document", "Pending for reviewing", "Your document is approved", "Your document is rejected"];
const queryId = "65b0ad3077279e830cc73822";
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

export default function VisaPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [displayStep, setDisplayStep] = React.useState(0);
    const [optData, setOptData] = React.useState();
    const [curStep, setCurStep] = React.useState({});
    const [fileLinks, setFileLinks] = React.useState([]);
    console.log("fileLinks: ", fileLinks);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/opt/${queryId}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("data: ", data);
                setOptData(data.optDoc);
                setActiveStep(data.optDoc.curDoc);
                setDisplayStep(data.optDoc.curDoc);
                setCurStep(data.optDoc.curDoc);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Run once when the component mounts

    const handleBack = () => {
        setDisplayStep((prevDisplayStep) => prevDisplayStep - 1);
    };
    const handleNext = () => {
        setDisplayStep((prevDisplayStep) => prevDisplayStep + 1);
    };
    const renderPdfViewer = () => {
        console.log("test opt data: ", curStep);
        let displayDoc = "";
        let displayStatus = 0;
        switch (activeStep) {
            case RECEIPT:
                displayDoc = curStep.Receipt;
                if (activeStep < curStep.curDoc) {
                    displayStatus = APPROVED;
                } else if (activeStep === curStep.curDoc) {
                    displayStatus = curStep.curStatus;
                }
                break;
            case EAD:
                displayDoc = curStep.EAD;
                if (activeStep < curStep.curDoc) {
                    displayStatus = APPROVED;
                } else if (activeStep === curStep.curDoc) {
                    displayStatus = curStep.curStatus;
                }
                break;
            case I983:
                displayDoc = curStep.I983;
                if (activeStep < curStep.curDoc) {
                    displayStatus = APPROVED;
                } else if (activeStep === curStep.curDoc) {
                    displayStatus = curStep.curStatus;
                }
                break;
            case I20:
                displayDoc = curStep.I20;
                if (activeStep < curStep.curDoc) {
                    displayStatus = APPROVED;
                } else if (activeStep === curStep.curDoc) {
                    displayStatus = curStep.curStatus;
                }
                break;
            default:
                break;
        }

        return (
            <Box>
                <img src={displayDoc} alt="pics of doc" />
                <Typography>current status: {status[displayStatus]}</Typography>
                <Button></Button>

            </Box>

        );
    };
  
    const handleUpload = async () =>{
        console.log("test filelinks ", fileLinks)
        try {
            const response = await axios.put('http://localhost:8080/api/opt/upload', {
                id: queryId,
                docType: displayStep,
                links: fileLinks,
            });
            console.log('Upload successful', response.data);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
    }
    const updateTempFiles = (newFile) => setFileLinks([...fileLinks, newFile]);

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? (
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
            ) : (
                <React.Fragment>
                    {displayStep === activeStep && <ActiveStepContent updateTempFiles={updateTempFiles} fileLinks={fileLinks} />}
                    {displayStep < activeStep && <CompletedStepContent curStep={displayStep} optData={optData} />}
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
                            <Button onClick={handleUpload}>upload</Button>
                        )}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );

}

const ActiveStepContent = ({ updateTempFiles, fileLinks }) => {
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
                console.log("documentUrl: ", documentUrl);
                setFileLink(documentUrl);
                updateTempFiles(documentUrl);
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
    };
    return <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", border: "lightgray solid 2px", margin: "20px 100px", width: "60vw", height: '60vh' }}>
        <Button color="error" component="label" size="small">
            Choose files
            <VisuallyHiddenInput type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={handleChoose} />
        </Button>
        {fileLinks && (
            <Typography variant="caption" color="textSecondary">
                Selected File:
                {fileLinks.map((file, index) => <a key={index} href={file}>{file} </a>)}
                {/* <a href={}>download</a> */}
            </Typography>
        )}
    </Box>

}
const CompletedStepContent = ({ curStep, optData }) => {
    const step = steps[curStep];
    console.log("optData: ", optData);
    return <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", border: "lightgray solid 2px", margin: "20px 100px", width: "60vw", height: '60vh' }}>
        <Typography sx={{ mt: 2, mb: 1 }}>Your current Step: {step}</Typography>

        <div>{optData[step]}</div>
        <a href={optData[step]}></a>
    </Box>
}