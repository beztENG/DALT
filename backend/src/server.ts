import express from "express";
import cors from "cors";
import { sample_events, sample_users } from "./data";
import userRouter from './router/user.router'
import eventsRouter from './router/events.router'

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4233"]
}));


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://thandh23044:Than23032003@englishwebproject.h2gd5cq.mongodb.net/?retryWrites=true&w=majority&appName=EnglishWebProject";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.use("/api/events",eventsRouter)
app.use("/api/user",userRouter);


const port = 5001;
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
