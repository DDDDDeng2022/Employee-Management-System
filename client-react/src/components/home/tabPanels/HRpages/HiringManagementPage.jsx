import React, { useState } from "react";
import {
    Typography,
    Tabs,
    Tab,
    Box,
} from "@mui/material";
import OnboardingReviewPage from "./hiringPages/OnboardingReviewPage";
import AllCandidatesPage from "./hiringPages/AllCandidatesPage";
import { Outlet, useLocation } from 'react-router-dom';

const HiringManagementPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const location = useLocation();

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs value={selectedTab} onChange={handleChange} variant="scrollable"
                scrollButtons="auto"
                sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    backgroundColor: "white",
                    position: 'static',
                    bottom: 0,
                    width: '100%',

                }}>
                <Tab label="Registration" sx={{ textTransform: "none" }} />
                <Tab label="Application Review" sx={{ textTransform: "none" }} />
            </Tabs>
            <Typography component="div" role="tabpanel" hidden={selectedTab !== 0}>
                <AllCandidatesPage />
            </Typography>
            <Typography component="div" role="tabpanel" hidden={selectedTab !== 1}>
                {location.pathname === "/home/hiring" ? <OnboardingReviewPage /> : <Outlet />}
            </Typography>
        </Box>
    );
};

export default HiringManagementPage;
