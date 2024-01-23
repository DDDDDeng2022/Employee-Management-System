import express from 'express';
import { approveDoc, createOptDocs, deleteDoc, getOptDocs, rejectDoc, uploadDoc } from '../controllers/optDocs.js';

const router = express.Router();

router.post('/new', createOptDocs);

router.get('/:id', getOptDocs);
/*  /65aefc287acdeb5c29a0e765  */

router.put('/upload', uploadDoc);
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