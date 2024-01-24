import express from "express";
import {
    login,
    signup,
    checkLogin
} from '../controllers/auth.js'

const router = express.Router();

router.post('/login', login);
router.post('/checkLogin', checkLogin)

router.post('/signup', signup);

export default router;