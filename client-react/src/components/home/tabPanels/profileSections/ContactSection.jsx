import React from 'react';
import { TextField } from '@mui/material';
import SectionContainer from './SectionContainer';
import { useForm } from 'react-hook-form';
export const ContactSection = ({ formData, isEmployeeProfile }) => {
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
            isEmployeeProfile={isEmployeeProfile}
        >
            <TextField
                {...register("cell_phone_number")}
                fullWidth
                disabled={isDisabled}
                label="Cell Phone Number"
                defaultValue={localData.cell_phone_number}
                onChange={(e) => setLocalData({ ...localData, cell_phone_number: e.target.value })}
            />
            <TextField
                {...register("work_phone_number")}
                fullWidth
                disabled={isDisabled}
                label="Work Phone Number"
                defaultValue={localData.work_phone_number}
                onChange={(e) => setLocalData({ ...localData, work_phone_number: e.target.value })}
            />
        </SectionContainer>
    );
};
