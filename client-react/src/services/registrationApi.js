const REGISTRATION_URL = "http://localhost:8080/api/registration";
async function getRegistors() {
    try {
        const response = await fetch(REGISTRATION_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const registors = await response.json();
        const registorsWithFullName = registors.map((registor) => {
            return {
                ...registor,
                name: `${registor.first_name} ${registor.last_name}`,
            };
        });

        return registorsWithFullName;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
async function createRegistration(registrationData) {
    try {
        const response = await fetch(`${REGISTRATION_URL}/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const registor = await response.json();
        const registorsWithFullName = {
            ...registor,
            name: `${registor.first_name} ${registor.last_name}`,
        };
        return registorsWithFullName;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export { getRegistors, createRegistration };
