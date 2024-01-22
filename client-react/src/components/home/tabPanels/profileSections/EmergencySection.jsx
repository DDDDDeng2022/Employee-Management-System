import React from 'react';
import { TextField } from '@mui/material';
import SectionContainer from './SectionContainer';
import { useForm } from 'react-hook-form';
import { LineBox } from '../ProfilePage';
export const EmergencyContactSection = ({ formData }) => {
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
        >
            <LineBox>
                <TextField
                    {...register("emergency Contact firstName")}
                    disabled={isDisabled}
                    required
                    fullWidth
                    label="First Name"
                    value={localData.firstName}
                    onChange={(e) => setLocalData({ ...localData, firstName: e.target.value })}
                />
                <TextField
                    {...register("emergency Contact  middleName")}
                    disabled={isDisabled}
                    label="Middle Name"
                    fullWidth
                    value={localData.middleName}
                    onChange={(e) => setLocalData({ ...localData, middleName: e.target.value })}
                />
                <TextField
                    {...register("emergency Contact lastName")}
                    required
                    fullWidth
                    disabled={isDisabled}
                    label="Last Name"
                    value={localData.lastName}
                    onChange={(e) => setLocalData({ ...localData, lastName: e.target.value })}
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
                value={localData.phone}
                onChange={(e) => setLocalData({ ...localData, phone: e.target.value })}
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
