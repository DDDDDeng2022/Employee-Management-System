import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Button, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

// import FormBox from './FormBox';

// todo : 之后可能改用FormBox。
// 该组件之后会进行修改，通过判断渲染成register或者是login

export default function Form() {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        alert("form data: " + JSON.stringify(data, null, 2));
        console.log("data: ", data);

        // todo:根据我们的后端更新
        // try {
        //     const response = await fetch('/api/login', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });

        //     const responseData = await response.json();

        //     if (response.ok) {
        //         console.log('Login Success', responseData);
        // navigate(`/home`);
        //     } else {
        //         alert(responseData.message || 'Login failed');
        //     }
        // } catch (error) {
        //     console.error('Login Error:', error);
        //     alert('Login failed. Please try again later.');
        // }
        navigate(`/home`);
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
            <TextField
                {...register("email", { required: "Email is required" })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
                label="Email"
                type='email' />
            <TextField
                {...register("username", { required: "Username is required" })}
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                fullWidth
                label="UserName" />
            <FormControl fullWidth sx={{ m: 1 }} error={Boolean(errors.password)}
            >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    {...register("password", { required: "Password is required" })}

                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
            </FormControl>
            {/* <Button type="submit" variant="contained" color="success" sx={{ textTransform: "none" }}>Sign in</Button> */}
            <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>Sign in</Button>

        </Box>
    );
}