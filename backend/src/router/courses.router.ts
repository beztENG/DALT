import { Request, Response, Router } from "express";
import asynceHandler from 'express-async-handler'
import { CoursesModel } from "../models/courses.model";

const router = Router();

// get data
router.get("/course/all", asynceHandler(
    async (req: Request, res: Response) => {
        const courses = await CoursesModel.find().exec();
        res.json(courses);
    }
))

// get data by id
router.get("/course/get/:id", asynceHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const course = await CoursesModel.findById(id).exec();
        res.json(course);
    }
))

// create data
router.post("/course/add", asynceHandler(
    async (req: Request, res: Response) => {
        const { name, imgUrl, description, time, numofLessons } = req.body;
        const course = await CoursesModel.create({ name, imgUrl, description, time, numofLessons });
        res.json(course);
    }
))

// update data
router.put("course/update/:id", asynceHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, imgUrl, description, time, numofLessons } = req.body;
        const course = await CoursesModel.findByIdAndUpdate(id, { name, imgUrl, description, time, numofLessons }, { new: true }).exec();
        res.json(course);
    }
))

//delete data
router.delete("cours/delete/:id", asynceHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        await CoursesModel.findByIdAndDelete(id).exec();
        res.json({ success: true });
    }
))
