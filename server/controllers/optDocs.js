import OptDocs from "../db/models/optDocs.js";

const RECEIPT = 0;
const EAD = 1;
const I983 = 2;
const I20 = 3;

const EMPTY = 0;
const PENDING = 1;
const REJECTED = 2;

//enable employee to upload document
const uploadDoc = async (req, res) => {
    const { id, docType, links } = req.body;
    try {
        const optDoc = await OptDocs.findById(id);
        if (!optDoc) {
            res.status(404).json({ msg: `optDoc id: ${id} is not found` });
            return;
        }
        if (docType !== optDoc.curDoc) {
            res.status(400).json({ msg: `The document upload is illegal at current opt managment status.` });
            return;
        }
        // if(optDoc.curStatus === APPROVED){
        //     res.status(400).json({msg: `The document has been approved. You cannot re-upload.`});
        //     return;
        // }
        switch (docType) {
            case RECEIPT:
                optDoc.Receipt = links;
                break;
            case EAD:
                optDoc.EAD = links;
                break;
            case I983:
                optDoc.I983 = links;
                break;
            case I20:
                optDoc.I20 = links;
                break;
            default:
                res.status(400).json({ msg: "Unknown requested document type." });
                return;
        }
        optDoc.curStatus = PENDING;
        await optDoc.save();
        res.status(200).json(optDoc);
        return;
    } catch (err) {
        res.status(500).json({ msg: "Internal Error in uploadDoc", err: err });
    }

};

const deleteDoc = async (req, res) => {
    const { id, docType } = req.body;
    try {
        const optDoc = await OptDocs.findById(id);
        if (!optDoc) {
            res.status(404).json({ msg: `optDoc id: ${id} is not found` });
            return;
        }
        if (docType !== optDoc.curDoc) {
            res.status(400).json({ msg: `The operation is denied. You cannot delete a previously approved document.` });
            return;
        }
        switch (docType) {
            case RECEIPT:
                optDoc.Receipt = [];
                break;
            case EAD:
                optDoc.EAD = [];
                break;
            case I983:
                optDoc.I983 = [];
                break;
            case I20:
                optDoc.I20 = [];
                break;
            default:
                res.status(400).json({ msg: "Unknown requested document type." });
                return;
        }
        optDoc.curStatus = EMPTY;
        await optDoc.save();
        res.status(200).json({ msg: "document delete success", optDoc: optDoc });
        return;
    } catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
};

//approve current document 
const approveDoc = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: "optDoc id is missing" });
        return;
    }
    try {
        const optDoc = await OptDocs.findById(id);
        if (!optDoc) {
            res.status(404).json({ msg: `optDoc id: ${id} is not found` });
            return;
        }
        if (optDoc.curStatus === PENDING) {
            optDoc.curDoc += 1;
            optDoc.curStatus = EMPTY;
            await optDoc.save();
            res.status(200).json({ msg: "document approval success", optDoc: optDoc });
            return;
        } else {
            res.status(400).json({ msg: "You cannot approve when no document uploaded" });
            return;
        }

    } catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
};

//reject current document 
const rejectDoc = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: "optDoc id is missing" });
        return;
    }
    try {
        const optDoc = await OptDocs.findById(id);
        if (!optDoc) {
            res.status(404).json({ msg: `optDoc id: ${id} is not found` });
            return;
        }
        /*need to decide whether the document is going to be deleted or not 
        automatically after rejection by HR later*/
        optDoc.curStatus = REJECTED;//need to decide whether being set to EMPTY later
        await optDoc.save();
        res.status(200).json({ msg: "document rejection success", optDoc: optDoc });
        return;
    } catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
}

const getOptDocs = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: "OptDoc id is missing. Try again." });
        return;
    }
    try {
        const optDoc = await OptDocs.findById(id);
        if (!optDoc) {
            res.status(404).json({ msg: `optDoc id: ${id} is not found` });
            return;
        }

        res.status(201).json(optDoc);
        return;
    } catch (err) {
        res.status(500).json({ mag: "Internal Error" }, err);
        return;
    }
};

const createOptDocs = async (req, res) => {
    try {
        const optDocs = new OptDocs();
        await optDocs.save();
        res.status(201).json(optDocs);
        return;
    } catch (err) {
        res.status(500).json({ mag: "Internal Error" }, err);
        return;
    }
};


const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded.' });
        };
        const file = req.file;
        console.log("file: ", file);
        const documentUrl = `${req.protocol}://${req.get('host')}/${file.path}`;
        res.status(200).send({ documentUrl: documentUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};

export {
    createOptDocs,
    uploadDoc,
    deleteDoc,
    approveDoc,
    rejectDoc,
    getOptDocs,
    uploadDocument
}