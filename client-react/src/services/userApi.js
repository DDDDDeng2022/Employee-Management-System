
const USER_URL = 'http://localhost:8080/api/user';

async function getProfiles() {
    try {
        const response = await fetch(USER_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let profiles = await response.json();
        profiles = profiles.map(profile => {
            let reviewStatus = profile.review_status;
            if (reviewStatus === true) {
                reviewStatus = 'Approved';
            } else if (reviewStatus === false) {
                reviewStatus = 'Rejected';
            } else {
                reviewStatus = 'Pending';
            }

            return {
                ...profile,
                review_status: reviewStatus
            };
        });
        return profiles;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



export { getProfiles };
