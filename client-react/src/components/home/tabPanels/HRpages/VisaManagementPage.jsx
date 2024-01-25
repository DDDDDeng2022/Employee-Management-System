import React from "react";
import CommomTabsLayout from "./CommomTabsLayout";
import InProcessPage from "./visaPages/InProcessPage";
import AllEmployeeVisaPages from "./visaPages/AllEmployeeVisaPages";
import { getProfiles } from "../../../../services/userApi";
export default function VisaManagementPage() {
    const [employees, setEmployees] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchEmployees = async () => {
        try {
            const fetchedEmployees = await getProfiles();
            const transformedEmployees = fetchedEmployees.map(employee => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    opt: employee.opt,
                    optDocs: employee.optDocs
                };
            });
            console.log("fetchedEmployees: ", transformedEmployees);
            setEmployees(transformedEmployees);
            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };
    React.useEffect(() => {
        fetchEmployees();
    }, [])
    return (
        <CommomTabsLayout
            tabs={[
                { label: "All" },
                { label: "In Process" }
            ]}
            tabPanels={[
                <AllEmployeeVisaPages employees={employees} />,
                <InProcessPage employees={employees} />
            ]}
        />

    );
}
