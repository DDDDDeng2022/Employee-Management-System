export default async function uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);
    try {
        const response = await fetch("http://localhost:8080/api/user/upload", {
            method: "POST",
            body: formData,
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.imageUrl;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
