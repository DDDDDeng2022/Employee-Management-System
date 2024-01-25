import { Box, Avatar, Select, TextField, Button, IconButton, FormControl, InputLabel, MenuItem, styled, Divider, Typography, Input, Chip } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { LineBox } from "./ProfilePage";
import uploadImage from "../../../services/uploadPhoto";
import SectionContainer from "./profileSections/SectionContainer";
import apiCall from "../../../services/apiCall";

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

export default function OnboardingPage(props) {
    const isEmployeeProfile = props?.isEmployeeProfile || false;

    const { profile_id } = props;
    const [profile, setProfile] = useState(useSelector((state) => state.myProfile.profile));
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (profile_id) {
                    const getProfile = await apiCall({ url: `/api/user/info/${profile_id}`, method: 'GET' })
                    if (getProfile.status === 201) {
                        console.log(getProfile);
                        setProfile(getProfile);
                    }
                }
            } catch (err) {
                console.error('Error fetching profile:', err)
            }
        }
        fetchProfile();
    }, [profile_id])
    const [localData, setLocalData] = useState(profile);
    const [avatar, setAvatar] = useState(profile?.photo);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isWorkVisa, setIsWorkVisa] = useState((!["citizen", "greencard"].includes(localData?.opt?.title)) ? true : false);
    const [showIdentity, setShowIdentity] = useState(false);
    const { register, handleSubmit, reset, control, setValue, getValues } = useForm({
        defaultValues: profile,
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "emergency_contact",
    });

    useEffect(() => {
        if (profile?.emergency_contact) {
          profile.emergency_contact.forEach((contact, index) => {
            setValue(`emergency_contact[${index}].first_name`, contact.first_name || '');
            setValue(`emergency_contact[${index}].middle_name`, contact.middle_name || '');
            setValue(`emergency_contact[${index}].last_name`, contact.last_name || '');
            setValue(`emergency_contact[${index}].email`, contact.email || '');
            setValue(`emergency_contact[${index}].phone_num`, contact.phone_num || '');
            setValue(`emergency_contact[${index}].relationship`, contact.relationship || '');
          });
        }
    
        if (["Pending", "Approved"].includes(localData?.review_status)) {
          setIsDisabled(true);
        }
    
        if (fields.length === 0) {
          append({});
        }
      }, [profile, setValue, localData, fields, append]);

    const chipColor = ChipColor(localData?.review_status);

    // handle functions
    const handleEdit = () => {
        setIsDisabled(!isDisabled);
    };

    const handleAvatarChange = () => {
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
                    setValue('photo', imageUrl);
                } catch (error) {
                    console.error("Upload error:", error);
                }
            }
        });
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
        setValue('photo', null);
    };

    const resetAvatar = () => {
        setAvatar(profile.photo);
        setValue('photo', profile.photo);
    };

    // upload file section
    const handleFileUpload = async (event) => {
        const selectedFile = event.target.files[0];
        const createOptDocs = await apiCall({ url: '/api/opt/new', method: 'POST', data: {} });
        const formData = new FormData();
        formData.append('document', selectedFile);
        const response = await fetch("http://localhost:8080/api/user/uploadDocument", {
            method: 'POST',
            body: formData,
        });
        await apiCall({ url: '/api/opt/upload', method: 'PUT', data: {
            id: createOptDocs._id,
            docType: 0,
            links: response.documentUrl
        } });
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
                    </IconButton>
                </Box>

                <SectionContainer
                    sectionName="OnboardingPage"
                    isDisabled={isDisabled}
                    handleEdit={handleEdit}
                    formData={profile}
                    handleSubmit={handleSubmit}
                    reset={reset}
                    resetAvatar={resetAvatar}
                    isEmployeeProfile={isEmployeeProfile}
                >
                    <Chip
                        label={localData?.review_status || "Never Submitted"}
                        color={chipColor}
                    />

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
                            value={localData?.first_name}
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
                            value={localData?.middle_name}
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
                            value={localData?.last_name}
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
                            value={localData?.prefered_name}
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
                        value={localData?.email}
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
                                value={localData?.gender}
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
                            value={localData?.ssn}
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
                                value={localData?.birth_date && (dayjs(localData?.birth_date))}
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
                            {...register("address.street")}
                            fullWidth
                            required
                            disabled={isDisabled}
                            label="Street"
                            value={localData?.address?.street}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData?.address,
                                        street: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("address.building")}
                            fullWidth
                            disabled={isDisabled}
                            label="Building"
                            value={localData?.address?.building}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData?.address,
                                        building: e.target.value,
                                    },
                                })
                            }
                        />
                    </LineBox>
                    <LineBox>
                        <TextField
                            {...register("address.city")}
                            fullWidth
                            required
                            disabled={isDisabled}
                            label="City"
                            value={localData?.address?.city}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData?.address,
                                        city: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("address.state")}
                            fullWidth
                            required
                            disabled={isDisabled}
                            label="State"
                            value={localData?.address?.state}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData?.address,
                                        state: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("address.zip")}
                            fullWidth
                            required
                            disabled={isDisabled}
                            label="Zip"
                            value={localData?.address?.zip}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    address: {
                                        ...localData?.address,
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
                        required
                        disabled={isDisabled}
                        label="Cell Phone Number"
                        defaultValue={localData?.cell_phone_number}
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
                        defaultValue={localData?.work_phone_number}
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
                            required
                            value={!isWorkVisa ? "yes" : "no"}
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

                    {(localData?.opt?.title || showIdentity) &&
                        (!isWorkVisa ? (
                            <FormControl fullWidth>
                                <InputLabel>Visa Status</InputLabel>
                                <Select
                                    {...register("opt.title")}
                                    required
                                    value={localData?.opt?.title}
                                    label="Visa Status"
                                    disabled={isDisabled}
                                    onChange={(e) =>
                                        setLocalData({
                                            ...localData,
                                            opt: {
                                                ...localData?.opt,
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
                                    {...register("opt.title")}
                                    required
                                    value={ localData?.opt?.title ?
                                        (["h1b", "f1", "l2"].includes(localData?.opt?.title)
                                            ? localData?.opt?.title
                                            : "other") : ""
                                    }
                                    label="Visa Status"
                                    disabled={isDisabled}
                                    onChange={(e) =>
                                        setLocalData({
                                            ...localData,
                                            opt: {
                                                ...localData?.opt,
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
                    ))}

                    {isWorkVisa && localData?.opt?.title === "f1" && (
                        <Input
                            type="file"
                            required
                            disabled={isDisabled}
                            onChange={handleFileUpload}
                        />
                    )}

                    {console.log(localData?.opt?.title)}

                    {localData?.opt?.title && isWorkVisa &&
                        !["h1b", "f1", "l2"].includes(localData?.opt?.title) && (
                            <TextField
                                {...register("opt.title")}
                                fullWidth
                                required
                                disabled={isDisabled}
                                label="Visa Status"
                                value={localData?.opt?.title}
                                onChange={(e) =>
                                    setLocalData({
                                        ...localData,
                                        opt: {
                                            ...localData?.opt,
                                            title: e.target.value,
                                        },
                                    })
                                }
                            />
                        )
                    }

                    {isWorkVisa && (
                        <LineBox>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={["DatePicker"]}
                                    sx={{ flex: 1 }}
                                >
                                    <DateField
                                        required
                                        {...register("opt.start_date")}
                                        disabled={isDisabled}
                                        fullWidth
                                        label="Visa Start Date"
                                        value={localData?.opt?.start_date && (dayjs(localData?.opt?.start_date))}
                                        onChange={(newValue) =>
                                            setLocalData({
                                                ...localData,
                                                opt: {
                                                    ...localData?.opt,
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
                                        {...register("opt.end_date")}
                                        disabled={isDisabled}
                                        fullWidth
                                        label="Visa End Date"
                                        value={localData?.opt?.end_date && (dayjs(localData?.opt?.end_date))}
                                        onChange={(newValue) =>
                                            setLocalData({
                                                ...localData,
                                                opt: {
                                                    ...localData?.opt,
                                                    end_date: newValue,
                                                },
                                            })
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </LineBox>
                    )}

                    {/* Reference Section */}
                    <Divider textAlign="left">
                        <Typography sx={{ fontSize: "14px", color: "grey" }}>
                            Reference
                        </Typography>
                    </Divider>
                    <LineBox>
                        <TextField
                            {...register("reference.first_name")}
                            disabled={isDisabled}
                            required
                            fullWidth
                            label="First Name"
                            value={localData?.reference?.first_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    reference: {
                                        ...localData?.reference,
                                        first_name: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("reference.middle_name")}
                            disabled={isDisabled}
                            label="Middle Name"
                            fullWidth
                            value={localData?.reference?.middle_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    reference: {
                                        ...localData?.reference,
                                        middle_name: e.target.value,
                                    },
                                })
                            }
                        />
                        <TextField
                            {...register("reference.last_name")}
                            required
                            fullWidth
                            disabled={isDisabled}
                            label="Last Name"
                            value={localData?.reference?.last_name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    reference: {
                                        ...localData?.reference,
                                        last_name: e.target.value,
                                    },
                                })
                            }
                        />
                    </LineBox>
                    <TextField
                        {...register("reference.email")}
                        fullWidth
                        disabled={isDisabled}
                        label="Email"
                        value={localData?.reference?.email}
                        onChange={(e) =>
                            setLocalData({
                                ...localData,
                                reference: {
                                    ...localData?.reference,
                                    email: e.target.value,
                                },
                            })
                        }
                    />
                    <TextField
                        {...register("reference.phone_num")}
                        fullWidth
                        label="Phone"
                        disabled={isDisabled}
                        value={localData?.reference?.phone_num}
                        onChange={(e) =>
                            setLocalData({
                                ...localData,
                                reference: {
                                    ...localData?.reference,
                                    phone_num: e.target.value,
                                },
                            })
                        }
                    />
                    <TextField
                        {...register("reference.relationship")}
                        fullWidth
                        required
                        label="Relationship"
                        disabled={isDisabled}
                        value={localData?.reference?.relationship}
                        onChange={(e) =>
                            setLocalData({
                                ...localData,
                                reference: {
                                    ...localData?.reference,
                                    relationship: e.target.value,
                                },
                            })
                        }
                    />

                    {/* Emergency Contact Section */}
                    <Divider textAlign="left">
                        <Typography sx={{ fontSize: "14px", color: "grey" }}>
                            Emergency Contacts
                        </Typography>
                    </Divider>

                    {/* TODO: emergency-contact setlocalData */}
                    {fields.map((contact, index) => (
                        <Box key={index} sx={{ display: "flex", flexDirection: 'column', gap: "20px" }}>
                            {console.log(index)}
                            {console.log(getValues()[`emergency_contact[0]`])}
                            <LineBox>
                                <TextField
                                    {...register(`emergency_contact[${index}].first_name`)}
                                    disabled={isDisabled}
                                    required
                                    fullWidth
                                    label="First Name"
                                    value={getValues()[`emergency_contact[${index}].first_name`]}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setValue(`emergency_contact[${index}].first_name`, e.target.value);
                                    }}
                                />
                                <TextField
                                    {...register(`emergency_contact[${index}].middle_name`)}
                                    disabled={isDisabled}
                                    label="Middle Name"
                                    fullWidth
                                    value={getValues()[`emergency_contact[${index}].middle_name`]}
                                    onChange={(e) => {
                                        setValue(`emergency_contact[${index}].middle_name`, e.target.value);
                                    }}
                                />
                                <TextField
                                    {...register(`emergency_contact[${index}].last_name`)}
                                    required
                                    fullWidth
                                    disabled={isDisabled}
                                    label="Last Name"
                                    value={getValues()[`emergency_contact[${index}].last_name`]}
                                    onChange={(e) => {
                                        setValue(`emergency_contact[${index}].last_name`, e.target.value);
                                    }}
                                />
                            </LineBox>
                            <TextField
                                {...register(`emergency_contact[${index}].email`)}
                                fullWidth
                                disabled={isDisabled}
                                label="Email"
                                value={getValues()[`emergency_contact[${index}].email`]}
                                onChange={(e) => {
                                    setValue(`emergency_contact[${index}].email`, e.target.value);
                                }}
                            />
                            <TextField
                                {...register(`emergency_contact[${index}].phone_num`)}
                                fullWidth
                                label="Phone"
                                disabled={isDisabled}
                                value={getValues()[`emergency_contact[${index}].phone_num`]}
                                onChange={(e) => {
                                    setValue(`emergency_contact[${index}].phone_num`, e.target.value);
                                }}
                            />
                            <TextField
                                {...register(`emergency_contact[${index}].relationship`)}
                                fullWidth
                                required
                                label="Relationship"
                                disabled={isDisabled}
                                value={getValues()[`emergency_contact[${index}].relationship`]}
                                onChange={(e) => {
                                    setValue(`emergency_contact[${index}].relationship`, e.target.value);
                                }}
                            />

                            <Button type="button" onClick={() => remove(index)}>
                                Remove
                            </Button>
                        </Box>
                    ))}

                    <Button type="button" onClick={() => append({})}>
                        Add Emergency Contact
                    </Button>
                </SectionContainer>
            </Box>
        </Box>
    );
}
