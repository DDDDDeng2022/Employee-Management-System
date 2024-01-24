import SectionContainer from "./SectionContainer";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    TextField,
} from "@mui/material";

export const VisaStatusSection = ({ formData, isEmployeeProfile }) => {
    const { control, handleSubmit, reset, register } = useForm({
        defaultValues: formData,
    });

    const [isDisabled, setIsDisabled] = useState(false);

    const onSubmit = (data) => {
        // Handle form submission logic here
        console.log(data);
        // You can perform further actions such as API calls or state updates here
    };

    return (
        <SectionContainer
            sectionName="Employment"
            isDisabled={isDisabled}
            // handleEdit={handleEdit}
            formData={formData}
            handleSubmit={handleSubmit}
            reset={reset}
            isEmployeeProfile={isEmployeeProfile}
        >
            <FormControl fullWidth>
                <InputLabel id="citizenship-label">
                    Permanent resident or citizen of the U.S.?
                </InputLabel>
                <Controller
                    name="isCitizen"
                    control={control}
                    defaultValue={formData.isCitizen || ""}
                    render={({ field }) => (
                        <Select
                            labelId="citizenship-label"
                            id="citizenship-select"
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                setIsDisabled(e.target.value === "yes");
                            }}
                        >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>

            {!isDisabled && (
                <FormControl fullWidth>
                    <InputLabel id="visa-type-label">
                        Select Visa Type
                    </InputLabel>
                    <Controller
                        name="visaType"
                        control={control}
                        defaultValue={formData.visaType || ""}
                        render={({ field }) => (
                            <Select
                                labelId="visa-type-label"
                                id="visa-type-select"
                                {...field}
                                disabled={isDisabled}
                            >
                                <MenuItem value="greenCard">
                                    Green Card
                                </MenuItem>
                                <MenuItem value="citizen">Citizen</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
            )}

            {formData.visaType === "f1" && (
                <FormControl fullWidth>
                    <InputLabel id="file-label">Upload PDF file</InputLabel>
                    <input
                        type="file"
                        id="file-input"
                        accept=".pdf"
                        {...register("file")}
                    />
                </FormControl>
            )}

            {formData.visaType === "other" && (
                <FormControl fullWidth>
                    <TextField
                        id="other-visa-type"
                        label="Enter other visa type"
                        variant="outlined"
                        {...register("otherVisaType")}
                    />
                </FormControl>
            )}

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </SectionContainer>
    );
};
