import React from 'react';
import { Box, Tabs, Tab } from "@mui/material";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./Header"
import OnboardingPage from './tabPanels/OnboardingPage';
import VisaPage from './tabPanels/VisaPage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TabPanels from './tabPanels/TabPanels';
const HomePage = () => {
    const [visible, setVisible] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const hanldeMenuVisible = () => setVisible(!visible);
    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#dadada" }}>
            <Header hanldeMenuVisible={hanldeMenuVisible} />
            <Box sx={{ flex: 1, marginTop: "10px", backgroundColor: "#f9fafb" }}>
                <Allotment
                    defaultSizes={[50, 400]}
                    onVisibleChange={(_index, value) => {
                        setVisible(value);
                    }}
                >
                    <Allotment.Pane >
                        <Tabs
                            orientation="vertical"
                            value={value}
                            onChange={handleChange}
                            sx={{
                                height: "100%",
                                borderRight: 1,
                                borderColor: "divider",
                                backgroundColor: "white",

                            }}
                        >
                            <Tab icon={< AccountCircleIcon />} label="Profile" sx={{ textTransform: "none" }} />
                            <Tab icon={<AssignmentIcon />} label="Onboarding Applicatoin" sx={{ textTransform: "none" }} />
                            <Tab icon={<ContactMailIcon />} label="Visa Status Management" sx={{ textTransform: "none" }} />
                        </Tabs>
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <TabPanels value={value} index={0}>
                            <div>Profile</div>
                        </TabPanels>
                        <TabPanels value={value} index={1}>
                            <OnboardingPage />
                        </TabPanels>
                        <TabPanels value={value} index={2}>
                            <VisaPage />
                        </TabPanels>
                    </Allotment.Pane>
                </Allotment>
            </Box>
        </Box >
    )
}
export default HomePage