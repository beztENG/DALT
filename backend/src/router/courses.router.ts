import { Request, Response, Router } from "express";
import asynceHandler from 'express-async-handler'
import { CourseModel } from "../models/courses.model";

const router = Router();
// get data
router.get("/all", asynceHandler(
    async (req: Request, res: Response) => {
        const courses = await CourseModel.find().exec();
        res.json(courses);
    }
))
// get data by id
router.get("/get/:courseId", asynceHandler(
    async (req: Request, res: Response) => {        
        const course = await CourseModel.find({courseId :req.params.courseId}).exec();
        res.json(course);
    }
))
// create data
router.post("/add", asynceHandler(
    async (req: Request, res: Response) => {
        const { courseId, name, imgUrl, description, time, numofLessons } = req.body;
        const course = await CourseModel.create({ courseId, name, imgUrl, description, time, numofLessons });
        res.json(course);
    }
))
// update data
router.put("/update/:id", asynceHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, imgUrl, description, time, numofLessons } = req.body;
        const course = await CourseModel.findByIdAndUpdate(id, { name, imgUrl, description, time, numofLessons }, { new: true }).exec();
        res.json(course);
    }
))
//delete data
router.delete("/delete/:id", asynceHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        await CourseModel.findByIdAndDelete(id).exec();
        res.json({ success: true });
    }
))
export default router;