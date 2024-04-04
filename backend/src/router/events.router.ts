import { Router } from "express";
import { sample_events} from "../data";

const router = Router();

router.get("/", (req,res) => {
    res.send(sample_events);
})

router.get("/:eventId",(req,res) => {
    const eventId = req.params.eventId;
    const events = sample_events.find(events => events.id == eventId);
    res.send(events);
})



export default router;