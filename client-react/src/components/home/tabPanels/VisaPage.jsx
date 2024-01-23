import React from "react";
import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import {
    MobileStepper,
    Step,
    StepButton,
    StepConnector,
    StepContent,
    StepIcon,
    StepLabel,
    Stepper,
    Button
  } from '@mui/material';
import Box from "@mui/material/Box";
import PDFViewer from 'pdf-viewer-reactjs';//npm install pdf-viewer-reactjs
import axios from "axios";
// import { Page, Document} from 'react'

const steps = ["Receipt", "EAD", "I983", "I20"];
const RECEIPT = 0;
const EAD = 1;
const I983 = 2;
const I20 = 3;

const EMPTY = 0;
const PENDING = 1;
const APPROVED =2;
const REJECTED = 3;

export default function VisaPage() {
  

    const [activeStep, setActiveStep] = React.useState(0);
    const [optDoc, setOptDoc] = React.useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              "http://localhost:8080/api/opt/65aefc287acdeb5c29a0e765"
            );
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            const doc = data.optDoc;
            setOptDoc(doc);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []); // Run once when the component mounts

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
////////////////////////////////////////////////////////////////////////////////////////////////
    const renderPdfViewer = () => {
        console.log("test opt data: ", optDoc);
        let displayDoc = "";
        let displayStatus = 0;
        switch(activeStep){
            case RECEIPT:
                displayDoc = optDoc.Receipt;
                if(activeStep < optDoc.curDoc){
                    displayDoc = APPROVED;
                }else if(activeStep === optDoc.curDoc){
                    displayDoc = optDoc.curStatus;
                }
                break;
            case EAD:
                displayDoc = optDoc.EAD;
                if(activeStep < optDoc.curDoc){
                    displayDoc = APPROVED;
                }else if(activeStep === optDoc.curDoc){
                    displayDoc = optDoc.curStatus;
                }
                break;
            case I983:
                displayDoc = optDoc.I983;
                if(activeStep < optDoc.curDoc){
                    displayDoc = APPROVED;
                }else if(activeStep === optDoc.curDoc){
                    displayDoc = optDoc.curStatus;
                }
                break;
            case I20:
                displayDoc = optDoc.I20;
                if(activeStep < optDoc.curDoc){
                    displayDoc = APPROVED;
                }else if(activeStep === optDoc.curDoc){
                    displayDoc = optDoc.curStatus;
                }
                break;
            default: 
                break;
        }
   
      return (
        <Box>
        <img src={displayDoc} alt="pics of doc" />
        <Typography>"current status: {displayStatus} "</Typography>
        
       
        </Box>
    
      );
    // Add similar conditions for other steps if needed
    return null;
  };

////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <Box sx={{ width: '100%' }}>

         {/* handle the stepper bar */}
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        

           {/* handle the middle content box */}
        <Box sx={{display: "flex", flexDirection:"column", justifyContent:"start", alignItems:"center", border: "lightgray solid 2px", margin: "20px 100px", width:"60vw"}}>
             <Typography sx={{ mt: 2, mb: 1 }}>Your current Step: {steps[activeStep]}</Typography>
             {renderPdfViewer()}
           
        
                
        </Box>


        {/* handle the <Next> and <Back> buttons */}
        {activeStep === steps.length ? (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}> */}
              {/* All Visa Documents are approved - Congratulations,you&apos;ve done the process! */}
            {/* </Typography> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
  
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
};
