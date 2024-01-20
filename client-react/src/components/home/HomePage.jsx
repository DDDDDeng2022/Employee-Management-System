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
    const handleLeftVisible = () => {
        setVisible(!visible)
        console.log("visible: ", visible)
    };
    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#dadada" }}>
            <Header handleLeftVisible={handleLeftVisible} />
            <Box sx={{ flex: 1, marginTop: "10px", backgroundColor: "#f9fafb" }}>
                <Allotment
                    defaultSizes={[20, 80]}
                    minSizes={[120, 300]}
                    onVisibleChange={(_index, value) => {
                        console.log("_index: ", _index);
                        console.log("value: ", value);
                        setVisible(value);
                    }}
                >
                    <Allotment.Pane visible={visible} snap minSize={120}>
                        <Tabs
                            orientation="vertical"
                            value={value}
                            onChange={handleChange}
                            sx={{
                                height: "100%",
                                flex: 1,
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