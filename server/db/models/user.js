import mongoose from "mongoose";
import Role from "./role.js";
import PersonalInfo from "./personalInfo.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: "Email address is required",
        validate: {
            validator: function (value) {
                return value.includes("@");
            },
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: "Role",
    },
    personal_info: {
        type: mongoose.Types.ObjectId,
        ref: "PersonalInfo",
    },
});

const User = mongoose.model("User", userSchema);

export default User;
