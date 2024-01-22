import React, { useState } from 'react';
import { Button } from '@mui/material';
import SectionContainer from './SectionContainer';
import { useForm } from 'react-hook-form';

// todo:先忽略

export const DocumentsSection = ({ formData }) => {
    const [localData, setLocalData] = React.useState(formData);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const { register, handleSubmit, reset } = useForm({ defaultValues: formData });
    const handleEdit = () => {
        setIsDisabled(!isDisabled);
    };
    return (
        <SectionContainer
            sectionName="Documents"
            isDisabled={isDisabled}
            handleEdit={handleEdit}
            formData={formData}
            handleSubmit={handleSubmit}
            reset={reset}
        >
            {formData.documents.map((doc, index) => (
                <div key={index}>
                    <p>{doc.name}</p>
                    {/* 提供下载和预览链接 */}
                    <Button href={doc.downloadUrl} download>Download</Button>
                    <Button href={doc.previewUrl} target="_blank">Preview</Button>
                </div>
            ))}
        </SectionContainer>
    );
};
