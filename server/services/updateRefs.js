import Contact from "../db/models/contact.js";
import Address from "../db/models/address.js";

export default async ({ update_fields, update_info, personal_info }) => {
    for (const [field, Model] of Object.entries(update_fields)) {
        if (update_info[field]) {
            const current_info = await Model.findById(personal_info[field]);
            await Model.findOneAndUpdate(
                { _id: personal_info[field] },
                { ...current_info, ...update_info[field] }
            );
            delete update_info[field];
        }
    }
    return;
};
