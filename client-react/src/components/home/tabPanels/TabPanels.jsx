import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function TabPanels(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel"
            hidden={value !== index}
            {...other}
            style={{
                height: "100%",
                background: "#faf8f8",
            }}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanels.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
