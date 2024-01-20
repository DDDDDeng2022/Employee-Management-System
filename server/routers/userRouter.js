import express from "express";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/user.js";
import { createPersonalInfo } from "../controllers/personalInfo.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/info/:id", createPersonalInfo);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
