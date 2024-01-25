import express from "express";
import {
    login,
    signup,
    checkLogin,
    decodeToken
} from '../controllers/auth.js'

const router = express.Router();

router.post('/login', login);
router.post('/checkLogin', checkLogin);

router.post('/signup', signup);

router.post('/decode', decodeToken);

export default router;