import { Typography, Button } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
export default function ErrorHandlePage() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(`/`);
    };
    return (<div style={{ width: "100%", height: "100%" }}>
        <div style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            gap: "20px",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ErrorOutlineIcon color="primary" sx={{ fontSize: { xs: "40px", sm: "60px" } }} />
            <Typography sx={{ fontWeight: 600, fontSize: { xs: "15px", sm: "20px" } }}>Oops, something went wrong!</Typography>
            <Button variant="contained" onClick={handleBack} sx={{ fontSize: { xs: "10px", sm: "16px" } }}> Go Home</Button>
        </div>
    </div >
    );
}