import express from 'express';
import 'dotenv/config'
import corsOptions from "./configs/cors";
import cors from 'cors';
import { initDB } from './configs/database';
import syncDB from './model/models';
import authRoute from './routes/authRoute';
import patientRoute from './routes/patientRoute';
import inventoryRoute from './routes/inventoryRoute';
import branchRoute from './routes/branchRoute';
import medicineRoute from './routes/medicineRoute';
import serviceRoute from './routes/serviceRoute';
import checkupRoute from './routes/checkupRoute';
import philMemberRoute from './routes/philMemberRoute';
import statementOfAccountRoute from './routes/statementOfAccountRoute';
import babyRoute from './routes/babyRoute';
import employeeRoute from './routes/employeeRoute';
import logsRoute from './routes/logsRoute';

const app = express();
const PORT = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use("/auth", authRoute);
app.use("/patient", patientRoute);
app.use("/inventory", inventoryRoute);
app.use("/branch", branchRoute);
app.use("/medicine", medicineRoute);
app.use("/service", serviceRoute);
app.use("/checkup", checkupRoute);
app.use("/philmember", philMemberRoute);
app.use("/account", statementOfAccountRoute);
app.use("/baby", babyRoute);
app.use("/employee", employeeRoute);
app.use('/logs', logsRoute);

app.listen(PORT, async () => {
    console.log(`Listening to port ${PORT}`);
    console.log(`Connecting to database.....`);
    await initDB();
    console.log(`Syncing to database......`);
    await syncDB(); // Uncomment this line
    console.log("Database synchronization complete!");
});