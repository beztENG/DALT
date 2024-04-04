import express from "express";
import cors from "cors";
import { sample_events, sample_users } from "./data";
import userRouter from './router/user.router'
import eventsRouter from './router/events.router'

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));


app.use("/api/events",eventsRouter)
app.use("/api/user",userRouter);


const port = 5001;
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
