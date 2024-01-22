import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SectionContainer from './SectionContainer';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { LineBox } from '../ProfilePage';
import { useForm } from 'react-hook-form';
export const EmploymentSection = ({ formData }) => {
    const [localData, setLocalData] = React.useState(formData);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const { register, handleSubmit, reset } = useForm({ defaultValues: formData });
    const handleEdit = () => {
        setIsDisabled(!isDisabled);
    };
    return (
        <SectionContainer
            sectionName="Employment"
            isDisabled={isDisabled}
            handleEdit={handleEdit}
            formData={formData}
            handleSubmit={handleSubmit}
            reset={reset}
        >

            <FormControl fullWidth>
                <InputLabel>Visa Status</InputLabel>
                <Select
                    {...register("visaStatus")}
                    defaultValue={localData.title}
                    label="Visa Status"
                    disabled={isDisabled}
                    onChange={(e) => setLocalData({ ...localData, visaStatus: e.target.value })}
                >
                    <MenuItem value="F1">F1</MenuItem>
                    <MenuItem value="H1B">H1B</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>
            <LineBox>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']} sx={{ flex: 1 }}>
                        <DateField required {...register("visa start_date")} disabled={isDisabled} fullWidth label="Visa Start Date" value={dayjs(localData.start_dat)}
                            onChange={(newValue) => setLocalData({ ...localData, start_dat: newValue })}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ flex: 1 }}>
                        <DateField required {...register("visa end_date")} disabled={isDisabled} fullWidth label="Visa End Date" value={dayjs(localData.end_date)}
                            onChange={(newValue) => setLocalData({ ...localData, end_date: newValue })}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </LineBox>
        </SectionContainer >
    );
};
