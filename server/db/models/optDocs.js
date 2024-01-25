import mongoose from 'mongoose';

const optDocsSchema = new mongoose.Schema({
    Docs: {
        type: [String],
        default: ["Receipt", "EAD", "I983", "I20"]

    },
    Status: {
        type: [String],
        default: ["empty", "pending", "rejected"]
    },
    curDoc: {
        type: Number,
        default: 0,
    },
    curStatus: {
        type: Number,
        default: 0,
    },
    Receipt: {
        type: [String],
        default: []
    },
    EAD: {
        type: [String],
        default: []
    },
    I983: {
        type: [String],
        default: []
    },
    I20: {
        type: [String],
        default: []
    },
    feedback: {
        type: String,
    }
});

const OptDocs = mongoose.model("OptDocs", optDocsSchema);
export default OptDocs;

