
const USER_URL = 'http://localhost:8080/api/user';

async function getProfiles() {
    try {
        const response = await fetch(USER_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        products.sort((a, b) => a.price - b.price);
        return products;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { getProfiles };
