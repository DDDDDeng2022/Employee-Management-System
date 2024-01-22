import User from "../db/models/user.js";

export default async (user_id) => {
    return await User.findById(user_id);
};
