
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
export const NameSection = ({ formData }) => {
    const [localData, setLocalData] = React.useState(formData);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [avatar, setAvatar] = React.useState(formData.photo);
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch("http://localhost:8080/api/user/upload", {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.imageUrl;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };
    const handleAvatarChange = async (e) => {
        console.log("hhhh");
        const file = e.target.files[0];
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                setAvatar(imageUrl);
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
        setIsDisabled(!isDisabled);
    };
    const resetAvatar = () => {
        setAvatar(formData.photo);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            >
                <LineBox>
                    <TextField
                        {...register("firstName")}
                        disabled={isDisabled}
                        required
                        fullWidth
                        label="First Name"
                        value={localData.firstName}
                        onChange={(e) => setLocalData({ ...localData, firstName: e.target.value })}
                    />
                    <TextField
                        {...register("middleName")}
                        disabled={isDisabled}
                        label="Middle Name"
                        fullWidth
                        value={localData.middleName}
                        onChange={(e) => setLocalData({ ...localData, middleName: e.target.value })}
                    />
                </LineBox>

                <LineBox>
                    <TextField
                        {...register("lastName")}
                        required
                        fullWidth
                        disabled={isDisabled}
                        label="Last Name"
                        value={localData.lastName}
                        onChange={(e) => setLocalData({ ...localData, lastName: e.target.value })}
                    />
                    <TextField
                        {...register("preferedName")}
                        fullWidth
                        disabled={isDisabled}
                        label="prefered Name"
                        value="prefered"
                        onChange={(e) => setLocalData({ ...localData, preferredName: e.target.value })}

                    />
                </LineBox>
                <TextField
                    {...register("email")}
                    fullWidth
                    required
                    disabled
                    label="Email"
                    value={localData.email}
                    margin="normal"
                />
                <LineBox>
                    <FormControl required sx={{ flex: 1 }}>
                        <InputLabel>Gender</InputLabel>
                        <Select {...register("gender")}
                            disabled={isDisabled}
                            onChange={(e) => setLocalData({ ...localData, gender: e.target.value })}
                            value={localData.gender} label="Gender">
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="I do not wish to answer">I do not wish to answer</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{ flex: 1 }}
                        {...register("SSN")}
                        label="SSN"
                        required
                        disabled={isDisabled}
                        value={localData.SSN}
                        onChange={(e) => setLocalData({ ...localData, SSN: e.target.value })}
                    />

                </LineBox>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DateField required {...register("birth_date")} disabled={isDisabled} fullWidth label="Birth Date" value={dayjs(localData.birth_date)}
                            onChange={(newValue) => setLocalData({ ...localData, birth_date: newValue })}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </SectionContainer >
        </Box>
    );
};

