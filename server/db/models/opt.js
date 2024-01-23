import mongoose from 'mongoose';

const optSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true,
    },
    end_date: {
        type: String,
        required: true,
    },
});

const OPT = mongoose.model("OPT", optSchema);

export default OPT;