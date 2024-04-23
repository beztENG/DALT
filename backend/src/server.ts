import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import userRouter from './router/user.router'
import eventsRouter from './router/events.router'
import academicManagementRouter from './router/academicManagement.router';
import contactBookRouter from './router/contactBook.router'
import { dbConnect } from './configs/database.config';



dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));


app.use("/api/events", eventsRouter)
app.use("/api/user", userRouter);
app.use("/api/academic", academicManagementRouter);
app.use("/api/contactBook", contactBookRouter);


const port = 5001;
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
