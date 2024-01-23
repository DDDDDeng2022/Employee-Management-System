import OptDocs from "../db/models/optDocs.js";
import fs from 'fs';
import path from 'path';
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
    console.log("test calling upload doc")
    // const { id, docType, link } = req.body;
    const { id, docType} = req.body;
    const file  = req.file;
    const link = `${req.protocol}://${req.get('host')}/uploads/opt/${file.filename}`;

    console.log("id", id)
    console.log("docType", docType);
    console.log("link ",link);

    try{
        const optDoc = await OptDocs.findById(id);
        if(!optDoc){
            res.status(404).json({msg: `optDoc id: ${id} is not found`});
            return;
        }
        if(docType !== optDoc.curDoc){
            res.status(400).json({msg: `The document upload is illegal at current opt managment status.`});
            return;
        }
        // if(optDoc.curStatus === APPROVED){
        //     res.status(400).json({msg: `The document has been approved. You cannot re-upload.`});
        //     return;
        // }
        console.log("test calling upload doc1")
        switch(docType){
            case RECEIPT:
                optDoc.Receipt = link;
                break;
            case EAD:
                optDoc.EAD = link;
                break;
            case I983:
                optDoc.I983 = link;
                break;
            case I20:  
                optDoc.I20 = link;
                break;
            default:
                res.status(400).json({msg: "Unknown requested document type."});
                return;
        }
        console.log("test calling upload doc2")
        optDoc.curStatus = PENDING;
        console.log("test calling upload do3")
        await optDoc.save();
        console.log("test calling upload doc4")
        res.status(200).json({msg: "document upload success", optDoc: optDoc});
        return;
    }catch(err){
        console.log("err: ",err)
        res.status(500).json({msg: "Internal Error in uploadDoc", err:err});
    }
   
};

const deleteDoc = async (req, res)=>{
    const { id, docType } = req.body;
    try{
        const optDoc = await OptDocs.findById(id);
        if(!optDoc){
            res.status(404).json({msg: `optDoc id: ${id} is not found`});
            return;
        }
        if(docType !== optDoc.curDoc ){
            res.status(400).json({msg: `The operation is denied. You cannot delete a previously approved document.`});
            return;
        }
        switch(docType){
            case RECEIPT:
                optDoc.Receipt = null;
                break;
            case EAD:
                optDoc.EAD = null;
                break;
            case I983:
                optDoc.I983 = null;
                break;
            case I20:  
                optDoc.I20 = null;
                break;
            default:
                res.status(400).json({msg: "Unknown requested document type."});
                return;
        }
        optDoc.curStatus = EMPTY;
        await optDoc.save();
        res.status(200).json({msg: "document delete success", optDoc: optDoc});
        return;
    }catch(err){
        res.status(500).json({msg: "Internal Error"});
    }
};

//approve current document 
const approveDoc = async (req, res)=>{
    const { id } = req.params;
    if(!id){
        res.status(400).json({msg: "optDoc id is missing"});
        return;
    }
    try{
        const optDoc = await OptDocs.findById(id);
        if(!optDoc){
            res.status(404).json({msg: `optDoc id: ${id} is not found`});
            return;
        }
        optDoc.curDoc += 1;
        optDoc.curStatus = EMPTY;
        await optDoc.save();
        res.status(200).json({msg: "document approval success", optDoc: optDoc});
        return;
    }catch(err){
        res.status(500).json({msg: "Internal Error"});
    }
};

//reject current document 
const rejectDoc = async (req, res)=>{
    const { id } = req.params;
    if(!id){
        res.status(400).json({msg: "optDoc id is missing"});
        return;
    }
    try{
        const optDoc = await OptDocs.findById(id);
        if(!optDoc){
            res.status(404).json({msg: `optDoc id: ${id} is not found`});
            return;
        }
        /*need to decide whether the document is going to be deleted or not 
        automatically after rejection by HR later*/
        optDoc.curStatus = REJECTED;//need to decide whether being set to EMPTY later
        await optDoc.save();
        res.status(200).json({msg: "document rejection success", optDoc: optDoc});
        return;
    }catch(err){
        res.status(500).json({msg: "Internal Error"});
    }
}

const getOptDocs = async (req, res)=>{
    const { id } = req.params;
    if(!id){
        res.status(400).json({msg: "OptDoc id is missing. Try again."});
        return;
    }
    try{
        const optDoc = await OptDocs.findById(id);
        if(!optDoc){
            res.status(404).json({msg: `optDoc id: ${id} is not found`});
            return;
        }
       
        res.status(201).json({msg: "new optDocs created success.", optDoc: optDoc });
        return;
    }catch(err){
        res.status(500).json({mag: "Internal Error"}, err);
        return;
    }
};

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
    rejectDoc,
    getOptDocs
}