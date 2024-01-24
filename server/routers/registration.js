import express from 'express';
import { createRegistration, getRegistration, getAllRegistors} from '../controllers/registration.js';
import sendMail from '../controllers/mailer.js';

const router = express.Router();

router.post('/new', createRegistration);
router.get('/:id', getRegistration);
router.post('/mail', sendMail);
router.get('/', getAllRegistors);



export default router;
