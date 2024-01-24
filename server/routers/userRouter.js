import express from "express";
import multer from 'multer';
import fs from 'fs';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/user.js";
import {
    createPersonalInfo,
    updatePersonalInfo,
    uploadPhoto
} from "../controllers/personalInfo.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const uploadFolder = path.join(__dirname, '../../uploads');
        cb(null, uploadFolder);
        // cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });
router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/info/:id", createPersonalInfo);
router.put("/:id", updateUser);
router.put("/info/:id", updatePersonalInfo);
router.delete("/:id", deleteUser);
router.post('/upload', upload.single('image'), uploadPhoto);

export default router;
