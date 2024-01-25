
import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Avatar, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { LineBox } from '../ProfilePage';
import { useForm } from 'react-hook-form';
import { styled } from "@mui/material/styles";
import uploadImage from "../../../../services/uploadPhoto"

import SectionContainer from './SectionContainer';
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export const NameSection = ({ formData, isEmployeeProfile }) => {
    const [localData, setLocalData] = React.useState(formData);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [avatar, setAvatar] = React.useState(formData?.photo);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                setAvatar(imageUrl);
                formData.photo = imageUrl;
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
    };
    const { register, handleSubmit, reset } = useForm({ defaultValues: formData });
    const handleEdit = () => {
        console.log(formData);
        if(!formData.first_name || !formData.last_name || !formData.email || !formData.gender) {
            alert("Please finish onboarding application first.")
        } else {
            setIsDisabled(!isDisabled);
        }
    };
    const resetAvatar = () => {
        setAvatar(formData?.photo);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* TODO: move onboarding image upload way to here and add delete photo */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
                <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
                {!isDisabled && <Box>
                    <Button variant="contained" size="small" component="label">
                        Upload Image
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={handleAvatarChange} />
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={handleRemoveAvatar}>
                        Remove
                    </Button>
                </Box>}
            </Box>
            <SectionContainer sectionName="Name"
                isDisabled={isDisabled}
                handleEdit={handleEdit}
                formData={formData}
                handleSubmit={handleSubmit}
                reset={reset}
                resetAvatar={resetAvatar}
                isEmployeeProfile={isEmployeeProfile}
            >
                <LineBox>
                    <TextField
                        {...register("first_name")}
                        disabled={isDisabled}
                        required
                        fullWidth
                        label="First Name"
                        value={localData?.first_name}
                        onChange={(e) => setLocalData({ ...localData, first_name: e.target.value })}
                    />
                    <TextField
                        {...register("middle_name")}
                        disabled={isDisabled}
                        label="Middle Name"
                        fullWidth
                        value={localData?.middle_name}
                        onChange={(e) => setLocalData({ ...localData, middle_name: e.target.value })}
                    />
                </LineBox>

                <LineBox>
                    <TextField
                        {...register("last_name")}
                        required
                        fullWidth
                        disabled={isDisabled}
                        label="Last Name"
                        value={localData?.last_name}
                        onChange={(e) => setLocalData({ ...localData, last_name: e.target.value })}
                    />
                    <TextField
                        {...register("prefered_name")}
                        fullWidth
                        disabled={isDisabled}
                        label="prefered Name"
                        value={localData?.prefered_name}
                        onChange={(e) => setLocalData({ ...localData, prefered_name: e.target.value })}

                    />
                </LineBox>
                <TextField
                    {...register("email")}
                    fullWidth
                    required
                    disabled
                    label="Email"
                    value={localData?.email}
                    margin="normal"
                />
                <LineBox>
                    <FormControl required sx={{ flex: 1 }}>
                        <InputLabel>Gender</InputLabel>
                        <Select {...register("gender")}
                            disabled={isDisabled}
                            onChange={(e) => setLocalData({ ...localData, gender: e.target.value })}
                            value={localData?.gender} label="Gender">
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="I do not wish to answer">I do not wish to answer</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{ flex: 1 }}
                        {...register("ssn")}
                        label="SSN"
                        required
                        disabled={isDisabled}
                        value={localData?.ssn}
                        onChange={(e) => setLocalData({ ...localData, ssn: e.target.value })}
                    />

                </LineBox>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DateField required {...register("birth_date")} disabled={isDisabled} fullWidth label="Birth Date" value={dayjs(localData?.birth_date)}
                            onChange={(newValue) => setLocalData({ ...localData, birth_date: newValue })}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </SectionContainer >
        </Box>
    );
};

