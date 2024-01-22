import React from 'react';
import { TextField } from '@mui/material';
import SectionContainer from './SectionContainer';
import { useForm } from 'react-hook-form';
export const ContactSection = ({ formData }) => {
    const [localData, setLocalData] = React.useState(formData);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const { register, handleSubmit, reset } = useForm({ defaultValues: formData });
    const handleEdit = () => {
        setIsDisabled(!isDisabled);
    };

    return (
        <SectionContainer
            sectionName="Contact"
            isDisabled={isDisabled}
            handleEdit={handleEdit}
            formData={formData}
            handleSubmit={handleSubmit}
            reset={reset}
        >
            <TextField
                {...register("cellPhoneNumber")}
                fullWidth
                disabled={isDisabled}
                label="Cell Phone Number"
                defaultValue={localData.cellPhoneNumber}
                onChange={(e) => setLocalData({ ...localData, cellPhoneNumber: e.target.value })}
            />
            <TextField
                {...register("workPhoneNumber")}
                fullWidth
                disabled={isDisabled}
                label="Work Phone Number"
                defaultValue={localData.workPhoneNumber}
                onChange={(e) => setLocalData({ ...localData, workPhoneNumber: e.target.value })}
            />
        </SectionContainer>
    );
};
