import OptDocs from "../db/models/optDocs.js";
// const curDocs = []
const RECEIPT = 0;
const EAD = 1;
const I983 = 2;
const I20 = 3;

const EMPTY = 0;
const PENDING = 1;
const APPROVED =2;
const REJECTED = 3;

//enable employee to upload document
const uploadDoc = async (req, res)=>{
    const { id, type, link } = req.body;
    try{
        const optDoc = await OptDocs.findById(id);
        if(!optDoc){
            res.status(404).json({msg: `optDoc id: ${id} is not found`});
            return;
        }
        if(type !== optDoc.curDoc || type !== optDoc.Docs[optDoc.curDoc]){
            res.status(400).json({msg: `The document upload is illegal at current opt managment status.`});
            return;
        }
        switch(type){
            case 0:
                optDoc.Receipt = link;
            case 1:
                optDoc.EAD = link;
            case 2:
                optDoc.I983 = link;
            case 3:  
                optDoc.I20 = link;
        }
        await optDoc.save();
        res.status(200).json({msg: "document upload success"});
        return;
    }catch(err){
        res.status(500).json({msg: "Internal Error"});
    }
   
};

const deleteDoc = async (req, res)=>{
    const { id, type } = req.body;
    try{
        const optDoc = await OptDocs.findById(id);
        if(!optDoc){
            res.status(404).json({msg: `optDoc id: ${id} is not found`});
            return;
        }
        if(type !== optDoc.curDoc || type !== optDoc.Docs[optDoc.curDoc]){
            res.status(400).json({msg: `The document upload is illegal at current opt managment status.`});
            return;
        }
        switch(type){
            case 0:
                optDoc.Receipt = null;
            case 1:
                optDoc.EAD = null;
            case 2:
                optDoc.I983 = null;
            case 3:  
                optDoc.I20 = null;
        }
        optDoc.curStatus = 1;//set to pending
        await optDoc.save();
        res.status(200).json({msg: "document delete success"});
        return;
    }catch(err){
        res.status(500).json({msg: "Internal Error"});
    }
};

//approve current document 
const approveDoc = async (req, res)=>{
    const { id } = req.body;
    try{
        const optDoc = await OptDocs.findById(id);
        if(!optDoc){
            res.status(404).json({msg: `optDoc id: ${id} is not found`});
            return;
        }
        optDoc.curStatus = APPROVED;
        optDoc.curDoc += 1;
        await optDoc.save();
        res.status(200).json({msg: "document approval success"});
        return;
    }catch(err){
        res.status(500).json({msg: "Internal Error"});
    }
};

//reject current document 
const rejectDoc = async (req, res)=>{
    const { id } = req.body;
    try{
        const optDoc = await OptDocs.findById(id);
        if(!optDoc){
            res.status(404).json({msg: `optDoc id: ${id} is not found`});
            return;
        }
        optDoc.curStatus = REJECTED;
        await optDoc.save();
        res.status(200).json({msg: "document rejection success"});
        return;
    }catch(err){
        res.status(500).json({msg: "Internal Error"});
    }
}

const createOptDocs = async (req, res)=>{
    try{
        const optDocs = new OptDocs();
        await optDocs.save();
        res.status(201).json({msg: "new optDocs created success.", optDocs: optDocs });
        return;
    }catch(err){
        res.status(500).json({mag: "Internal Error"}, err);
        return;
    }
};

export {
    createOptDocs,
    uploadDoc,
    deleteDoc,
    approveDoc,
    rejectDoc
}