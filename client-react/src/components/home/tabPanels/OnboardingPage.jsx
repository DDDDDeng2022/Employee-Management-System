import {
    Box,
    Avatar,
    Select,
    TextField,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    MenuItem,
    styled,
    Divider,
    Typography,
    Input,
    Chip,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { LineBox } from "./ProfilePage";
import uploadImage from "../../../services/uploadPhoto";
import SectionContainer from "./profileSections/SectionContainer";

// export const VisuallyHiddenInput = styled("input")({
//     clip: "rect(0 0 0 0)",
//     clipPath: "inset(50%)",
//     height: 1,
//     overflow: "hidden",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     whiteSpace: "nowrap",
//     width: 1,
// });

const ChipColor = (reviewStatus) => {
    switch (reviewStatus) {
        case "Never Submitted":
            return "warning";
        case "Rejected":
            return "error";
        case "Approved":
            return "success";
        default:
            return "info";
    }
};

export default function OnboardingPage() {
    const profile = useSelector((state) => state.myProfile.profile);
    const [localData, setLocalData] = useState(profile);
    console.log(localData);
    const [avatar, setAvatar] = useState(profile.photo);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isWorkVisa, setIsWorkVisa] = useState(false);
    const [showIdentity, setShowIdentity] = useState(false);
    const [reviewStatus, setReviewStatus] = useState("Never Submitted");
    const { register, handleSubmit, reset } = useForm({
        defaultValues: profile,
    });

    useEffect(() => {
        if (
            Object.keys(localData).length !== 0 &&
            localData.review_status === null
        ) {
            setReviewStatus("Pending");
            setIsDisabled(true);
        } else if (localData.review_status === false) {
            setReviewStatus("Rejected");
        } else if (localData.review_status === true) {
            setReviewStatus("Approved");
            setIsDisabled(true);
        }
    }, []);
    const chipColor = ChipColor(reviewStatus);

    // handle functions
    const handleEdit = () => {
        setIsDisabled(!isDisabled);
    };

    // Name Section
    // const handleAvatarChange = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         try {
    //             const imageUrl = await uploadImage(file);
    //             setAvatar(imageUrl);
    //         } catch (error) {
    //             console.error("Upload error:", error);
    //         }
    //     }
    // };
    const handleAvatarChange = () => {
        // 触发文件选择的点击事件
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();
        input.addEventListener("change", async (event) => {
            console.log(event.target.files[0]);
            const file = event.target.files[0];
            if (file) {
                try {
                    const imageUrl = await uploadImage(file);
                    setAvatar(imageUrl);
                } catch (error) {
                    console.error("Upload error:", error);
                }
            }
        });
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
    };

    const resetAvatar = () => {
        setAvatar(profile.photo);
    };

    // upload file section
    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        console.log("Selected file:", selectedFile);
    };

    return (
        <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "auto" }}>
            {/* Name Section */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                    }}
                >
                    <IconButton
                        disabled={isDisabled}
                        onClick={handleAvatarChange}
                    >
                        <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
                        {/* <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        /> */}
                    </IconButton>
                    {/* {!isDisabled && (
                        <Box>
                            <Button
                                variant="contained"
                                size="small"
                                component="label"
                            >
                                Upload Image
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={handleRemoveAvatar}
                            >
                                Remove
                            </Button>
                        </Box>
                    )} */}
                </Box>

                <SectionContainer
                    sectionName="OnboardingPage"
                    isDisabled={isDisabled}
                    handleEdit={handleEdit}
                    formData={profile}
                    handleSubmit={handleSubmit}
                    reset={reset}
                    resetAvatar={resetAvatar}
                    // isEmployeeProfile={isEmployeeProfile}
                >
                    <Chip label={reviewStatus} color={chipColor} />

                    {/* User Section */}
                    <Divider textAlign="left">
                        <Typography sx={{ fontSize: "14px", color: "grey" }}>
                            Basic Info
                        </Typography>
                    </Divider>
                    <LineBox>
                        <TextField
                            {...register("first_name")}
                            disabled={isDisabled}
                            required
                            fullWidth
                            label="First Name"
                            value={localData.first_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    first_name: e.target.value,
                                })
                            }
                        />
                        <TextField
                            {...register("middle_name")}
                            disabled={isDisabled}
                            label="Middle Name"
                            fullWidth
                            value={localData.middle_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    middle_name: e.target.value,
                                })
                            }
                        />
                    </LineBox>

                    <LineBox>
                        <TextField
                            {...register("last_name")}
                            required
                            fullWidth
                            disabled={isDisabled}
                            label="Last Name"
                            value={localData.last_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    last_name: e.target.value,
                                })
                            }
                        />
                        <TextField
                            {...register("prefered_name")}
                            fullWidth
                            disabled={isDisabled}
                            label="prefered Name"
                            value={localData.prefered_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    prefered_name: e.target.value,
                                })
                            }
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
                            <Select
                                {...register("gender")}
                                disabled={isDisabled}
                                onChange={(e) =>
                                    setLocalData({
                                        ...localData,
                                        gender: e.target.value,
                                    })
                                }
                                value={localData.gender}
                                label="Gender"
                            >
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="I do not wish to answer">
                                    I do not wish to answer
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ flex: 1 }}
                            {...register("ssn")}
                            label="SSN"
                            required
                            disabled={isDisabled}
                            value={localData.ssn}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    ssn: e.target.value,
                                })
                            }
                        />
                    </LineBox>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DateField
                                required
                                {...register("birth_date")}
                                disabled={isDisabled}
                                fullWidth
                                label="Birth Date"
                                value={dayjs(localData.birth_date)}
                                onChange={(newValue) =>
                                    setLocalData({
                                        ...localData,
                                        birth_date: newValue,
                                    })
                                }
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    {/* Address Section */}
                    <Divider textAlign="left">
                        <Typography sx={{ fontSize: "14px", color: "grey" }}>
                            Address
                        </Typography>
                    </Divider>
                    <LineBox>
                        <TextField
                            {...register("building")}
                            fullWidth
                            disabled={isDisabled}
                            label="Building"
                            value={localData.address.building}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData.address,
                                        building: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("street")}
                            fullWidth
                            disabled={isDisabled}
                            label="Street"
                            value={localData.address.street}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData.address,
                                        street: e.target.value,
                                    },
                                })
                            }
                        />
                    </LineBox>
                    <LineBox>
                        <TextField
                            {...register("city")}
                            fullWidth
                            disabled={isDisabled}
                            label="City"
                            value={localData.address.city}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData.address,
                                        city: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("state")}
                            fullWidth
                            disabled={isDisabled}
                            label="State"
                            value={localData.address.state}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData.address,
                                        state: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("zip")}
                            fullWidth
                            disabled={isDisabled}
                            label="Zip"
                            value={localData.address.zip}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData.address,
                                        zip: e.target.value,
                                    },
                                })
                            }
                        />
                    </LineBox>

                    {/* Contact Section */}
                    <Divider textAlign="left">
                        <Typography sx={{ fontSize: "14px", color: "grey" }}>
                            Contact
                        </Typography>
                    </Divider>
                    <TextField
                        {...register("cell_phone_number")}
                        fullWidth
                        disabled={isDisabled}
                        label="Cell Phone Number"
                        defaultValue={localData.cell_phone_number}
                        onChange={(e) =>
                            setLocalData({
                                ...localData,
                                cell_phone_number: e.target.value,
                            })
                        }
                    />
                    <TextField
                        {...register("work_phone_number")}
                        fullWidth
                        disabled={isDisabled}
                        label="Work Phone Number"
                        defaultValue={localData.work_phone_number}
                        onChange={(e) =>
                            setLocalData({
                                ...localData,
                                work_phone_number: e.target.value,
                            })
                        }
                    />

                    {/* Employment Section */}
                    <Divider textAlign="left">
                        <Typography sx={{ fontSize: "14px", color: "grey" }}>
                            Employment
                        </Typography>
                    </Divider>
                    <FormControl fullWidth>
                        <InputLabel>
                            Permanent resident or citizen of the U.S.?
                        </InputLabel>
                        <Select
                            // {...register("visaStatus")}
                            defaultValue={
                                ["citizen", "greencard"].includes(
                                    localData.opt.title
                                )
                                    ? "yes"
                                    : "no"
                            }
                            label="Permanent resident or citizen of the U.S.?"
                            disabled={isDisabled}
                            onChange={(e) => {
                                setIsWorkVisa(e.target.value === "no");
                                setShowIdentity(true);
                            }}
                        >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>

                    {showIdentity && !isWorkVisa ? (
                        <FormControl fullWidth>
                            <InputLabel>Visa Status</InputLabel>
                            <Select
                                {...register("visaStatus")}
                                defaultValue={localData.opt.title}
                                label="Visa Status"
                                disabled={isDisabled}
                                onChange={(e) =>
                                    setLocalData({
                                        ...localData,
                                        opt: {
                                            ...localData.opt,
                                            title: e.target.value,
                                        },
                                    })
                                }
                            >
                                <MenuItem value="citizen">Citizen</MenuItem>
                                <MenuItem value="greencard">
                                    Green Card
                                </MenuItem>
                            </Select>
                        </FormControl>
                    ) : (
                        <FormControl fullWidth>
                            <InputLabel>Visa Status</InputLabel>
                            <Select
                                {...register("visaStatus")}
                                defaultValue={
                                    ["h1b", "f1", "l2"].includes(
                                        localData.opt.title
                                    )
                                        ? localData.opt.title
                                        : "other"
                                }
                                label="Visa Status"
                                disabled={isDisabled}
                                onChange={(e) =>
                                    setLocalData({
                                        ...localData,
                                        opt: {
                                            ...localData.opt,
                                            title: e.target.value,
                                        },
                                    })
                                }
                            >
                                <MenuItem value="f1">F1(CPT/OPT)</MenuItem>
                                <MenuItem value="h1b">H1-B</MenuItem>
                                <MenuItem value="l2">L2</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {!isWorkVisa && localData.opt.title === "f1" && (
                        <Input
                            type="file"
                            disabled={isDisabled}
                            onChange={handleFileUpload}
                        />
                    )}

                    {!isWorkVisa &&
                        !["h1b", "f1", "l2"].includes(localData.opt.title) && (
                            <TextField
                                {...register("other")}
                                fullWidth
                                disabled={isDisabled}
                                label="Visa Status"
                                value={localData.opt.title}
                                onChange={(e) =>
                                    setLocalData({
                                        ...localData,
                                        opt: {
                                            ...localData.opt,
                                            title: e.target.value,
                                        },
                                    })
                                }
                            />
                        )}

                    {isWorkVisa && (
                        <LineBox>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={["DatePicker"]}
                                    sx={{ flex: 1 }}
                                >
                                    <DateField
                                        required
                                        {...register("visa start_date")}
                                        disabled={isDisabled}
                                        fullWidth
                                        label="Visa Start Date"
                                        value={dayjs(localData.opt.start_dat)}
                                        onChange={(newValue) =>
                                            setLocalData({
                                                ...localData,
                                                opt: {
                                                    ...localData.opt,
                                                    start_date: newValue,
                                                },
                                            })
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={["DatePicker"]}
                                    sx={{ flex: 1 }}
                                >
                                    <DateField
                                        required
                                        {...register("visa end_date")}
                                        disabled={isDisabled}
                                        fullWidth
                                        label="Visa End Date"
                                        value={dayjs(localData.opt.end_date)}
                                        onChange={(newValue) =>
                                            setLocalData({
                                                ...localData,
                                                opt: {
                                                    ...localData.opt,
                                                    end_date: newValue,
                                                },
                                            })
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </LineBox>
                    )}

                    {/* Emergency Contact Section */}
                    <Divider textAlign="left">
                        <Typography sx={{ fontSize: "14px", color: "grey" }}>
                            Emergency Contact
                        </Typography>
                    </Divider>
                    <LineBox>
                        <TextField
                            {...register("emergency Contact firstName")}
                            disabled={isDisabled}
                            required
                            fullWidth
                            label="First Name"
                            value={localData.emergency_contact.first_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    emergency_contact: {
                                        ...localData.emergency_contact,
                                        first_name: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("emergency Contact  middleName")}
                            disabled={isDisabled}
                            label="Middle Name"
                            fullWidth
                            value={localData.emergency_contact.middle_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    emergency_contact: {
                                        ...localData.emergency_contact,
                                        middle_name: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("emergency Contact lastName")}
                            required
                            fullWidth
                            disabled={isDisabled}
                            label="Last Name"
                            value={localData.emergency_contact.last_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    emergency_contact: {
                                        ...localData.emergency_contact,
                                        last_name: e.target.value,
                                    },
                                })
                            }
                        />
                    </LineBox>
                    <TextField
                        {...register("emergency Contact email")}
                        fullWidth
                        required
                        disabled={isDisabled}
                        label="Email"
                        value={localData.emergency_contact.email}
                        onChange={(e) =>
                            setLocalData({
                                ...localData,
                                emergency_contact: {
                                    ...localData.emergency_contact,
                                    email: e.target.value,
                                },
                            })
                        }
                    />
                    <TextField
                        {...register("emergency Contact Phone")}
                        fullWidth
                        label="Phone"
                        disabled={isDisabled}
                        value={localData.emergency_contact.phone_num}
                        onChange={(e) =>
                            setLocalData({
                                ...localData,
                                emergency_contact: {
                                    ...localData.emergency_contact,
                                    phone_num: e.target.value,
                                },
                            })
                        }
                    />
                    <TextField
                        {...register("emergency Contact relation")}
                        fullWidth
                        label="Relationship"
                        disabled={isDisabled}
                        value={localData.emergency_contact.relationship}
                        onChange={(e) =>
                            setLocalData({
                                ...localData,
                                emergency_contact: {
                                    ...localData.emergency_contact,
                                    relationship: e.target.value,
                                },
                            })
                        }
                    />
                </SectionContainer>
            </Box>
        </Box>
    );
}
