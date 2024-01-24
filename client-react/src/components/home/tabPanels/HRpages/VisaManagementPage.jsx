import React from "react";

import CommomTabsLayout from "./CommomTabsLayout";
import InProcessPage from "./visaPages/InProcessPage";
import AllEmployeeVisaPages from "./visaPages/AllEmployeeVisaPages";
export default function VisaManagementPage() {
    return (
        <CommomTabsLayout
            tabs={[
                { label: "All" },
                { label: "In Process" }
            ]}
            tabPanels={[
                <AllEmployeeVisaPages />,
                <InProcessPage />
            ]}
        />

    );
}
