import express from 'express';
import 'dotenv/config'
import corsOptions from "./configs/cors";
import cors from 'cors';
import { initDB } from './configs/database';
import syncDB from './model/models';

const app = express();
const PORT = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());
app

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(PORT, async () => {
    console.log(`Listening to port ${PORT}`);
    console.log(`Connecting to database.....`);
    await initDB();
    console.log(`Syncing to database......`);
    await syncDB();
});