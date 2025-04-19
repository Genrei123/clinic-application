import express from 'express';
import 'dotenv/config'
import corsOptions from "./configs/cors";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});