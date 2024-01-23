const BASE_URL = "http://localhost:8080";

export default async function apiCall({ url: apiUrl, method, data }) {
    const url = new URL(apiUrl, BASE_URL).href;
    const default_header = {
        "Content-Type": "application/json",
    };

    if (localStorage.getItem("token")) {
        default_header["Authorization"] = `Bearer ${localStorage.getItem(
            "token"
        )}`;
    }

    const response = await fetch(url, {
        method,
        headers: {
            ...default_header,
        },
        body: JSON.stringify(data),
    });

    // if (!response.ok) {
    //     const { error } = await response.json();
    //     console.log(error);
    //     throw new Error(error.message);
    // }
    const result = await response.json();
    return {
        status: response.status,
        ...result,
    };
}
