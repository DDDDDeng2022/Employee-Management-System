import React from 'react';
import { TextField } from '@mui/material';
import SectionContainer from './SectionContainer';
import { useForm } from 'react-hook-form';
import { LineBox } from '../ProfilePage';
export const AddressSection = ({ formData, isEmployeeProfile }) => {
    const [localData, setLocalData] = React.useState(formData);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const { register, handleSubmit, reset } = useForm({ defaultValues: formData });
    const handleEdit = () => {
        setIsDisabled(!isDisabled);
    };
    return (
        <SectionContainer
            sectionName="Address"
            isDisabled={isDisabled}
            handleEdit={handleEdit}
            formData={formData}
            handleSubmit={handleSubmit}
            reset={reset}
            isEmployeeProfile={isEmployeeProfile}
        >
            <LineBox>
                <TextField
                    {...register("building")}
                    fullWidth
                    disabled={isDisabled}
                    label="Building"
                    value={localData?.building}
                    onChange={(e) => setLocalData({ ...localData, building: e.target.value })}
                />
                <TextField
                    {...register("street")}
                    fullWidth
                    disabled={isDisabled}
                    label="Street"
                    value={localData?.street}
                    onChange={(e) => setLocalData({ ...localData, street: e.target.value })}
                />
            </LineBox>
            <LineBox>
                <TextField
                    {...register("city")}
                    fullWidth
                    disabled={isDisabled}
                    label="City"
                    value={localData?.city}
                    onChange={(e) => setLocalData({ ...localData, city: e.target.value })}
                />
                <TextField
                    {...register("state")}
                    fullWidth
                    disabled={isDisabled}
                    label="State"
                    value={localData?.state}
                    onChange={(e) => setLocalData({ ...localData, state: e.target.value })}
                />
                <TextField
                    {...register("zip")}
                    fullWidth
                    disabled={isDisabled}
                    label="Zip"
                    value={localData?.zip}
                    onChange={(e) => setLocalData({ ...localData, zip: e.target.value })}
                />
            </LineBox>
        </SectionContainer >
    );
};
