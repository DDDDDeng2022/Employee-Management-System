import express from "express";
import multer from 'multer';
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

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
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
