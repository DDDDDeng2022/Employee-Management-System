import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import UserRouter from "./routers/userRouter.js";
import AuthRouter from "./routers/authRouter.js";
import RegistRouter from "./routers/registration.js";
<<<<<<< HEAD
import OptDocsRouter from './routers/optDocs.js';

=======
import path, { dirname } from "path";
import { fileURLToPath } from "url";
>>>>>>> main

const PORT = 8080;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/registration", RegistRouter);
<<<<<<< HEAD
app.use('/api/opt', OptDocsRouter);
app.use('/uploads', express.static('uploads'));
=======
app.use('/uploads', express.static(path.join(dirname(fileURLToPath(import.meta.url)), '../uploads')));
>>>>>>> main

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
