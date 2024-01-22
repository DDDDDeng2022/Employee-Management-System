import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    firstName:{
        type: String,
        // required: true,
    },
    lastName:{
        type: String,
        // required: true,
    },
    email:{
        type: String,
        required: "email adress is required",
        unique: true,
        validate: {
            validator: function (input){
                return input.includes('@') && input.includes('.');
            },
            message: "invalid email format"
        }

    },
    token:{
        type: String,
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now
    },

});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;