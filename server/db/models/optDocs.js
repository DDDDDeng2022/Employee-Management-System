import mongoose from 'mongoose';

const optDocsSchema = new mongoose.Schema({
    Docs: {
        type:  [String],
        default: ["Receipt", "EAD", "I983", "I20"]
        
    },
    Status: {
        type: [String],
        default: ["empty", "pending", "approved", "rejected"]
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
        type: String,
        default: null
    },
    EAD: {
        type: String,
        default: null
    },
    I983: {
        type: String,
        default: null
    },
    I20: {
        type: String,
        default: null
    }
});

const OptDocs = mongoose.model("OptDocs", optDocsSchema);
export default OptDocs;

   