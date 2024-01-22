import express from 'express';
import 'dotenv/config';
import connectDB from './db/connectDB.js';
import cors from 'cors';
import RegistRouter from './routers/registration.js'

const PORT = 8080;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/registration', RegistRouter);


app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`) });