import User from "../db/models/user.js";

const getAllUsers = async (req, res) => {
    await User.find()
        .populate("personal_info")
        .then((users) => {
            const user_data = users.map((user) => {
                const new_obj = {
                    first_name: user.personal_info?.first_name,
                    last_name: user.personal_info?.last_name,
                    ssn: user.personal_info?.ssn,
                    visa_type: user.personal_info?.visa_type,
                    phone_num: user.personal_info?.phone_num,
                    email: user.email,
                };
                return new_obj;
            });
            res.status(200).json(user_data);
        })
        .catch((err) => {
            res.status(500).json({ err, message: "Server Error" });
        });
};

const getUserById = async (req, res) => {
    await User.findById(req.params?.id)
        .populate("role")
        .populate({
            path: "personal_info",
            populate: [
                { path: "current_address", model: "Address" },
                { path: "reference", model: "Contact" },
                { path: "emergency_contact", model: "Contact" },
            ],
        })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json({ err, message: "Server Error" });
        });
};

// Only use for update password
const updateUser = async (req, res) => {
    const updated_user = req.body;
    updated_user.updated_at = new Date();
    await User.findByIdAndUpdate(req.params?.id, updated_user, {
        new: true,
    })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json({ err, message: "Server Error" });
        });
};

const deleteUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.params?.id,
        { deleted: true },
        { new: true }
    )
        .then((result) => {
            res.status(200).json({ result, message: "User deleted" });
        })
        .catch((err) => {
            res.status(500).json({ err, message: "Server Error" });
        });
};

export { getAllUsers, getUserById, updateUser, deleteUser };
