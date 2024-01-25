
// import React from 'react';
// import { Box, Tabs, Tab, Typography } from '@mui/material';

// export default function CommomTabsLayout({ tabs, tabPanels, selectedTab, handleChange }) {
//     return (
//         <Box sx={{ width: "100%" }}>
//             <Tabs value={selectedTab} onChange={handleChange} variant="scrollable"
//                 scrollButtons="auto"
//                 sx={{
//                     borderTop: 1,
//                     borderColor: "divider",
//                     backgroundColor: "white",
//                     position: 'static',
//                     bottom: 0,
//                     width: '100%',
//                 }}>
//                 {tabs.map((tab, index) => (
//                     <Tab key={index} label={tab.label} sx={{ textTransform: "none" }} />
//                 ))}
//             </Tabs>
//             {tabPanels.map((Panel, index) => (
//                 <Typography component="div" role="tabpanel" hidden={selectedTab !== index} key={index}>
//                     {Panel}
//                 </Typography>
//             ))}
//         </Box>
//     );
// };

import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';

export default function CommomTabsLayout({ tabs, tabPanels }) {
    const [selectedTab, setSelectedTab] = useState(0);

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
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} sx={{ textTransform: "none" }} />
                ))}
            </Tabs>
            {tabPanels.map((Panel, index) => (
                <Typography component="div" role="tabpanel" hidden={selectedTab !== index} key={index}>
                    {Panel}
                </Typography>
            ))}
        </Box>
    );
};

