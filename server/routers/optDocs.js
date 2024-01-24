import express from 'express';
import multer from 'multer';
import { approveDoc, createOptDocs, deleteDoc, getOptDocs, rejectDoc, uploadDoc, uploadDocument } from '../controllers/optDocs.js';
// Set up Multer storage
// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, "../uploads/opt");
//     },
//     filename: (req, file, cb) =>{
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
//         cb(null, '<' + sanitizedFilename + '>' + '-' + uniqueSuffix);
//     },
// });

// const upload = multer({storage: fileStorageEngine});
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "../uploads/opt");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({storage: fileStorageEngine});


const router = express.Router();

router.post('/new', createOptDocs);

router.get('/:id', getOptDocs);
/*  /65aefc287acdeb5c29a0e765  */

// router.put('/upload', upload.single('file'),uploadDoc);
router.put('/upload', uploadDoc);
/* {
    "id": "65aefc287acdeb5c29a0e765",
    "docType": 2,
    "links": [link1, link2,...]

} */

router.put('/approval/:id', approveDoc);
/*  /approval/65aefc287acdeb5c29a0e765  */


router.put('/rejection/:id', rejectDoc);
/*  /rejection/65aefc287acdeb5c29a0e765 */


router.delete('/deletion', deleteDoc);
/* {
    "id": "65aefc287acdeb5c29a0e765",
    "docType": 2
    }
*/
router.post('/uploadDocument', upload.single('document'), uploadDocument);

export default router;