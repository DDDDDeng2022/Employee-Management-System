import express from 'express';
import { createRegistration, getRegistrationByEmail, getTokenByEmail } from '../controllers/registration.js';
import sendMail from '../controllers/mailer.js';

const router = express.Router();

/* use to create registration or renew token */
router.post('/new', createRegistration);

/* use to get registration by email */
router.get('/:email', getRegistrationByEmail);

/* use to get token string by email */
router.get('/token/:email', getTokenByEmail);

/* use to send registration invitation email; req.body{ targetEmail, token } */
router.post('/mail',sendMail);


export default router;
