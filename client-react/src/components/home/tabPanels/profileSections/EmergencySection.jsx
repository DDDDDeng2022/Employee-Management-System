import React from 'react';
import { TextField } from '@mui/material';
import SectionContainer from './SectionContainer';
import { useForm } from 'react-hook-form';
import { LineBox } from '../ProfilePage';
export const EmergencyContactSection = ({ formData, isEmployeeProfile }) => {
    const [localData, setLocalData] = React.useState(formData);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const { register, handleSubmit, reset } = useForm({ defaultValues: formData });
    const handleEdit = () => {
        setIsDisabled(!isDisabled);
    };
    return (
        <SectionContainer
            sectionName="Emergency Contact"
            isDisabled={isDisabled}
            handleEdit={handleEdit}
            formData={formData}
            handleSubmit={handleSubmit}
            reset={reset}
            isEmployeeProfile={isEmployeeProfile}
        >
            <LineBox>
                <TextField
                    {...register("emergency Contact firstName")}
                    disabled={isDisabled}
                    required
                    fullWidth
                    label="First Name"
                    value={localData.first_name}
                    onChange={(e) => setLocalData({ ...localData, first_name: e.target.value })}
                />
                <TextField
                    {...register("emergency Contact  middleName")}
                    disabled={isDisabled}
                    label="Middle Name"
                    fullWidth
                    value={localData.middle_name}
                    onChange={(e) => setLocalData({ ...localData, middle_name: e.target.value })}
                />
                <TextField
                    {...register("emergency Contact lastName")}
                    required
                    fullWidth
                    disabled={isDisabled}
                    label="Last Name"
                    value={localData.last_name}
                    onChange={(e) => setLocalData({ ...localData, last_name: e.target.value })}
                />
            </LineBox>
            <TextField
                {...register("emergency Contact email")}
                fullWidth
                required
                disabled={isDisabled}
                label="Email"
                value={localData.email}
                onChange={(e) => setLocalData({ ...localData, email: e.target.value })}

            />
            <TextField
                {...register("emergency Contact Phone")}
                fullWidth
                label="Phone"
                disabled={isDisabled}
                value={localData.phone_num}
                onChange={(e) => setLocalData({ ...localData, phone_num: e.target.value })}
            />
            <TextField
                {...register("emergency Contact relation")}
                fullWidth
                label="Relationship"
                disabled={isDisabled}
                value={localData.relationship}
                onChange={(e) => setLocalData({ ...localData, relationship: e.target.value })}
            />
        </SectionContainer>
    );
};
