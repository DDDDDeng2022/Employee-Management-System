import express from 'express';
import multer from 'multer';
import { approveDoc, createOptDocs, deleteDoc, getOptDocs, rejectDoc, uploadDoc } from '../controllers/optDocs.js';
// Set up Multer storage
// const storage = multer.memoryStorage(); // Use memory storage, you can change this based on your requirements
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "../uploads/opt");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({storage: fileStorageEngine});
// const upload = multer({ storage: storage });
// const upload = multer({ dest: '../uploads/' });
const router = express.Router();

router.post('/new', createOptDocs);

router.get('/:id', getOptDocs);
/*  /65aefc287acdeb5c29a0e765  */

router.put('/upload', upload.single('file'),uploadDoc);
/* {
    "id": "65aefc287acdeb5c29a0e765",
    "docType": 2,
    "link": "https://i983/example.pdf"

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


export default router;