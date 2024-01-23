import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    building: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    }
})

const Address = mongoose.model('Address', addressSchema);

export default Address;