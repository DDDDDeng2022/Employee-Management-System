import React from "react";
import OnboardingReviewPage from "./hiringPages/OnboardingReviewPage";
import AllCandidatesPage from "./hiringPages/AllCandidatesPage";
import { Outlet, useLocation } from 'react-router-dom';
import CommomTabsLayout from "./CommomTabsLayout";

const HiringManagementPage = () => {
    const location = useLocation();
    return (
        <CommomTabsLayout
            tabs={[
                { label: "Registration" },
                { label: "Application Review" }
            ]}
            tabPanels={[
                <AllCandidatesPage />,
                location.pathname === "/home/hiring" ? <OnboardingReviewPage /> : <Outlet />
            ]}
        />
    );
};

export default HiringManagementPage;
