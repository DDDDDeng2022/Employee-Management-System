
import React from "react";
import { getProfiles } from "../../../../../services/userApi";
import ApplicationList from "./ApplicationList";
import { Box, CircularProgress } from "@mui/material";
import { LoadingComponent } from "../EmployeeProfilesPage";

const OnboardingReviewPage = () => {
    const [applications, setApplications] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const fetchApplications = async () => {
        try {
            const fetchedApplications = await getProfiles();
            setApplications(fetchedApplications);
            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };
    React.useEffect(() => {
        fetchApplications();
    }, [])
    return (loading ?
        <LoadingComponent />
        :
        <Box sx={{ paddingTop: "15px" }}>
            <ApplicationList status="Pending" applications={applications} updateApplications={fetchApplications} />
            <ApplicationList status="Rejected" applications={applications} updateApplications={fetchApplications} />
            <ApplicationList status="Approved" applications={applications} updateApplications={fetchApplications} />
        </Box>
    );
};



export default OnboardingReviewPage;
