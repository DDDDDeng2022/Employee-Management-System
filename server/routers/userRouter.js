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
    getPersonalInfo,
    updatInfo,
    uploadPhoto,
    uploadDocument
} from "../controllers/personalInfo.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const photoFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Not a JPG or PNG photo'), false);
    }
};

const documentFileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword') {
        cb(null, true);
    } else {
        cb(new Error('Not a PDF or DOC file'), false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const uploadFolder = path.join(__dirname, '../../uploads');
        cb(null, uploadFolder);
        // cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        cb(null, sanitizedFilename + '-' + uniqueSuffix);
    }
});

const uploadPhotoMulter = multer({ storage: storage, fileFilter: photoFileFilter });
const uploadDocumentMulter = multer({ storage: storage, fileFilter: documentFileFilter });

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/info/:id", getPersonalInfo);

router.put("/profileInfo/:id", updatInfo);
router.put("/:id", updateUser);
router.post("/info/:id", createPersonalInfo);
// router.put("/info/:id", updatePersonalInfo);
router.delete("/:id", deleteUser);
router.post('/upload', uploadPhotoMulter.single('image'), uploadPhoto);
router.post('/uploadDocument', uploadDocumentMulter.single('document'), uploadDocument);

export default router;
