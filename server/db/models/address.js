import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street_name: {
        type: String,
        required: true
    },
    building_num: {
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