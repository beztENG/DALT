import { Router } from "express";
import { sample_events} from "../data";
import asynceHandler from 'express-async-handler'
import { EventsModel } from "../models/events.model";

const router = Router();

router.get("/seed", asynceHandler (
    async (req,res) => {
        const eventsCount = await EventsModel.countDocuments();
        if(eventsCount > 0){
            res.send("Seed is already done!");
            return;
        }
        await EventsModel.create(sample_events);
        res.send("Seed is done!");
    }
))

router.get("/", asynceHandler (
    async (req,res) => {
        const events = await EventsModel.find();
        res.send(events);
    }
))

router.get("/:eventId", asynceHandler(
    async (req,res) => {
        const events = await EventsModel.findById(req.params.eventId);
        res.send(events);
    }
))





export default router;