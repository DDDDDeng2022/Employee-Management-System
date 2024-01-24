import * as React from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Button, FormHelperText } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import apiCall from "../../services/apiCall";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { setIsLogin } from "../../redux/loginStateSlice";
import { setMyProfile } from "../../redux/myProfileSlice";

// import FormBox from './FormBox';

// todo : 之后可能改用FormBox。
// 该组件之后会进行修改，通过判断渲染成register或者是login
const checkReviewStatus = (profile) => {
    let reviewStatus = profile?.review_status || "Never Submitted";
    if (reviewStatus === true) {
        reviewStatus = 'Approved';
    } else if (reviewStatus === false) {
        reviewStatus = 'Rejected';
    } else {
        reviewStatus = 'Pending';
    }

    return {
        ...profile,
        review_status: reviewStatus
    };
}

export default function Form() {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        alert("form data: " + JSON.stringify(data, null, 2));
        console.log("data: ", data);

        // todo:根据我们的后端更新
        try {
            await apiCall({
                url: "/api/auth/login",
                method: "POST",
                data,
            }).then((response) => {
                console.log(response._doc);

                if (response.status === 201) {
                    console.log("Login Success", response);
                    response._doc.personal_info = checkReviewStatus(response._doc.personal_info);
                    dispatch(setIsLogin(true));
                    dispatch(
                        setUser({
                            id: response._doc._id,
                            username: response._doc.username,
                            role: response._doc.role,
                            personal_info: response._doc.personal_info?._id,
                        })
                    );
                    dispatch(setMyProfile(response._doc?.personal_info));
                    localStorage.setItem("token", response.token);
                    if (response._doc.personal_info) {
                        navigate(`/home/profile`);
                    } else {
                        navigate("/home/onboarding");
                    }
                } else {
                    alert(response.message || "Login failed");
                }
            });
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed. Please try again later.");
        }
        // navigate(`/home`);
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                backgroundColor: "white",
                padding: "20px",
                boxSizing: "border-box",
                width: {
                    xs: "90%",
                    md: "600px",
                },
                height: "500px",
                borderRadius: "10px",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
            }}
        >
            <Typography sx={{ fontSize: { xs: "24px", sm: "34px" }, fontWeight: "700" }}>
                Sign in
            </Typography>
            {/* <TextField
                {...register("email", { required: "Email is required" })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                label="Email"
                type="email"
            /> */}
            <TextField
                {...register("username", { required: "Username is required" })}
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                fullWidth
                label="UserName"
            />
            <FormControl fullWidth sx={{ m: 1 }} error={Boolean(errors.password)}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    {...register("password", { required: "Password is required" })}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (<VisibilityOff />) : (<Visibility />)}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
                {errors.password && (<FormHelperText>{errors.password.message}</FormHelperText>)}
            </FormControl>
            {/* <Button type="submit" variant="contained" color="success" sx={{ textTransform: "none" }}>Sign in</Button> */}
            <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>Sign in</Button>
        </Box>
    );
}
