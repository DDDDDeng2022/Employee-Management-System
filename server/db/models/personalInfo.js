import mongoose from "mongoose";
import Address from "./address.js"

const personalInfoSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String
    },
    current_address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    phone_num: {
        type: Number,
        required: true
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
    ssn: {
        type: Number,
        required: true
    },
    birth_date: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other', 'I do not wish to answer'],
        default: 'I do not wish to answer'
    },
    visa_type: {
        type: String,
        required: true
    },
    review_status: {
        type: String,
        required: true
    },
    preferred_name: {
        type: String
    },
    profile_pic: {
        type: String
    },
    work_phone_num: {
        type: String
    },
    reference: {
        type: mongoose.Types.ObjectId,
        ref: "Contact"
    },
    emergency_contact: {
        type: mongoose.Types.ObjectId,
        ref: "Contact"
    },
    opt: {
        type: mongoose.Types.ObjectId,
        ref: "OPT"
    },
    // uploaded_files: [ fileRecord ]
})

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);

export default PersonalInfo;