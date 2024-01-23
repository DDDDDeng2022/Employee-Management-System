import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import UserRouter from "./routers/userRouter.js";
import AuthRouter from "./routers/authRouter.js";
import RegistRouter from "./routers/registration.js";
import OptDocsRouter from './routers/optDocs.js';


const PORT = 8080;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/registration", RegistRouter);
app.use('/api/opt', OptDocsRouter);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
