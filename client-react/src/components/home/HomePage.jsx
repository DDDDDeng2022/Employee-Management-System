import React from 'react';
import { Box, Tabs, Tab, useTheme, useMediaQuery } from "@mui/material";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./Header"
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TabPanels from './tabPanels/TabPanels';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import GroupsIcon from '@mui/icons-material/Groups';

const HomePage = () => {
    const [visible, setVisible] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // todo,之后根据role来判断应用哪个tabs

    // const tabs = [
    //     { label: "Profile", path: "/home/profile", icon: <AccountCircleIcon /> },
    //     { label: "Onboarding Application", path: "/home/onboarding", icon: <AssignmentIcon /> },
    //     { label: "Visa Status", path: "/home/visa", icon: <ContactMailIcon /> },
    //     // 之后可以根据需要添加更多 Tabs
    // ];

    const tabs = [
        { label: "Profile", path: "/home/profile", icon: <AccountCircleIcon /> },
        { label: "EmployeeProfiles", path: "/home/employee", icon: <GroupsIcon /> },
        { label: "Visa Status Management", path: "/home/visaManagement", icon: <SwitchAccountIcon /> },
        { label: "Hiring Management", path: "/home/hiring", icon: <ManageAccountsIcon /> },
    ];
    React.useEffect(() => {
        const currentTab = tabs.findIndex(tab => tab.path === location.pathname);
        if (currentTab >= 0) {
            setValue(currentTab);
        }
    }, [location]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(tabs[newValue].path);
    };

    const handleLeftVisible = () => {
        setVisible(!visible)
    };

    return (
        isSmallScreen ?
            <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#dadada" }}>
                <Header handleLeftVisible={handleLeftVisible} />
                {tabs.map((tab, index) => (
                    <TabPanels key={tab.label} value={value} index={index} >
                        {value === index && <Outlet />}
                    </TabPanels>
                ))}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        borderTop: 1,
                        borderColor: "divider",
                        backgroundColor: "white",
                        position: 'static',
                        bottom: 0,
                        width: '100%',

                    }}
                > {tabs.map((tab, index) => (
                    <Tab
                        key={tab.label}
                        icon={tab.icon}
                        label={tab.label}
                        sx={{ textTransform: "none" }}
                    />
                ))}
                </Tabs>

            </Box >
            :
            <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#dadada" }}>
                <Header handleLeftVisible={handleLeftVisible} />
                <Allotment
                    defaultSizes={[20, 80]}
                    minSizes={[120, 300]}
                    onVisibleChange={(_index, value) => {
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
                            {
                                tabs.map((tab, index) => (
                                    <Tab
                                        key={tab.label}
                                        icon={tab.icon}
                                        label={tab.label}
                                        sx={{ textTransform: "none" }}
                                    />
                                ))
                            }

                        </Tabs >
                    </Allotment.Pane >
                    <Allotment.Pane>
                        {tabs.map((tab, index) => (
                            <TabPanels key={tab.label} value={value} index={index}>
                                {value === index && <Outlet />}
                            </TabPanels>
                        ))}
                    </Allotment.Pane>
                </Allotment >
            </Box >
    )
}
export default HomePage