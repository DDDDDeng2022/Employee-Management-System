import PersonalInfo from "../db/models/personalInfo.js";

export default async (personal_info_id) => {
    return await PersonalInfo.findById(personal_info_id);
};
