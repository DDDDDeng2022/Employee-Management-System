import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    phone_num: {
        type: String,
    },
    middle_name: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // required: 'Email address is required',
        validate: {
            validator: function (value) {
                return value.includes('@');
            }
        }
    }
})

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;