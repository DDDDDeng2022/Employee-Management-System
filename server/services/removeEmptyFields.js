export default function removeEmptyFields(data) {
    if (typeof data === 'object') {
        if (Array.isArray(data)) {
            return data
                .filter(item => item !== "")
                .map(item => removeEmptyFields(item));
        } else {
            const cleanedObj = {};
            for (const key in data) {
                if (data[key] !== "") {
                    cleanedObj[key] = removeEmptyFields(data[key]);
                }
            }
            return cleanedObj;
        }
    } else {
        return data;
    }
}