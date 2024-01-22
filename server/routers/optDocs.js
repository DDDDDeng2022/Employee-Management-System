import express from 'express';
import { createOptDocs } from '../controllers/optDocs.js';

const router = express.Router();

router.post('/new', createOptDocs);

export default router;