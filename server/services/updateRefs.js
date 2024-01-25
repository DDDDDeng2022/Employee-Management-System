import Contact from "../db/models/contact.js";
import Address from "../db/models/address.js";

export default async ({ update_fields, personal_info, prev_personal_info }) => {
    for (const [field, Model] of Object.entries(update_fields)) {
        if (personal_info[field]) {
            const current_info = await Model.findById(prev_personal_info[field]);
            await Model.findOneAndUpdate(
                { _id: prev_personal_info[field] },
                { ...current_info, ...personal_info[field] }
            );
            personal_info[field] = prev_personal_info[field];
        }
    }
    return;
};
