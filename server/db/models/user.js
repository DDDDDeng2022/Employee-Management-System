import mongoose from "mongoose";
import PersonalInfo from "./personalInfo";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: {
            validator: function (value) {
                return value.includes('@');
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    personal_info: {
        type: mongoose.Types.ObjectId,
        ref: "PersonalInfo"
    }
})

const User = mongoose.model("User", userSchema);

export default User;