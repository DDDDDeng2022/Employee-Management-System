import { Box, Typography } from '@mui/material';
import Form from "./Form"
import './LoginPage.css'
const LoginPage = () => {
    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            flexDirection: { xs: "column", sm: "row" },
            // background: "linear-gradient(to bottom, #d1ffd3, #ffffff)",
            background: "linear-gradient(to bottom, rgb(209 239 255) , #ffffff)",


            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "20px", sm: "50px" },
        }}>
            <Box >
                <Box sx={{
                    fontFamily: "Lemon, serif",
                    // color: "forestgreen",
                    color: "#228b85",
                    fontSize: { xs: "20px", sm: "50px" },
                    textAlign: "center"
                }}>Welcome to P2HR Management System.</Box>
                <Typography sx={{ fontSize: { xs: "15px", sm: "20px", textAlign: "center", color: "grey" } }}>
                    This is designed by Bei Deng, Qingyu Zhou, Wentai Liu at Chuwa®.
                </Typography>
            </Box>
            <Form isSignup={false} />
        </Box >
    )
}
export default LoginPage