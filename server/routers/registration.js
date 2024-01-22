import express from 'express';
import { sendRegistration,test } from '../controllers/registration.js';
import sendMail from '../controllers/mailer.js';

const router = express.Router();

router.post('/send', sendRegistration);
// router.get('/test', test);
router.post('/mail',sendMail);


export default router;
