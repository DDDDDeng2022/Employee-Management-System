import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
export const FormBox = ({ children, component: Component = 'div', ...props }) => {
    return (
        <Box
            as={Component}
            {...props}
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
                // margin: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
            }}
        >

            {children}
        </Box>
    );
};
export default FormBox;
