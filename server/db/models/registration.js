import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: "email adress is required",
        validate: {
            validator: function (input) {
                return input.includes("@") && input.includes(".");
            },
            message: "invalid email format",
        },
    },
    token: {
        type: String,
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: false,
    },
    link: {
        type: String,
        unique: true,
        validate: {
            validator: function (input) {
                return input.startsWith("http://localhost:3000/");
            },
            message: "invalid link",
        },
    },
});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
