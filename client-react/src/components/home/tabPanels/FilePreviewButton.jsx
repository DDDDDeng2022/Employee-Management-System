import React from 'react';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { getfileName } from './HRpages/visaPages/AllEmployeeVisaPages';
const FilePreviewButton = ({ fileUrl, fileName }) => {
  const handlePreviewClick = async () => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: 'blob',
      });

      // Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: 'application/pdf' });

      // Build a URL from the file
      const fileURL = URL.createObjectURL(file);

      // Open the URL in a new window
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;
      pdfWindow.document.title = 'fileName';
      console.log("test file tab ", fileName);
    } catch (error) {
      console.error('Error fetching or previewing the PDF:', error);
    }
  };

  return (
    <Button
      Button variant="contained" size="small" sx={{ margin: '0 5px', padding: '3px' }}
      startIcon={<VisibilityIcon />}
      onClick={handlePreviewClick}
    >
      Online Preview
    </Button>
  );
};

export default FilePreviewButton;


export const handlePreview = async (fileUrl) => {
  const fileName = getfileName(fileUrl)
  try {
    const response = await axios.get(fileUrl, {
      responseType: 'blob',
    });

    // Create a Blob from the PDF Stream
    const file = new Blob([response.data], { type: 'application/pdf' });

    // Build a URL from the file
    const fileURL = URL.createObjectURL(file);

    // Open the URL in a new window
    const pdfWindow = window.open();
    pdfWindow.location.href = fileURL;
    pdfWindow.document.title = 'fileName';
    console.log("test file tab ", fileName);
  } catch (error) {
    console.error('Error fetching or previewing the PDF:', error);
  }
};