import { Request, Response, Router } from "express";
import asynceHandler from 'express-async-handler'
import { Class, ClassModel } from "../models/classes.model";

const router = Router();
// get data
router.get("/all", asynceHandler(
    async (req: Request, res: Response) => {
        const classrooms = await ClassModel.find().exec();
        res.json(classrooms);
    }
))
// get datas by id
router.get("/get/:courseId", asynceHandler(
    async (req: Request, res: Response) => {
        const classroom= await ClassModel.find({courseId: req.params.courseId}).exec();
        res.json(classroom);
    }
))
// create data
router.post("/add", asynceHandler(
    async (req: Request, res: Response) => {
        const classroom = req.body as Class;
        const newclassroom = await ClassModel.create(classroom);
        res.json(newclassroom);
    }
))
//add student to class
router.post("/addStudent/:classId", asynceHandler(
    async (req: Request, res: Response) => {
        const classroom = req.body as Class;
        const newclassroom = await ClassModel.findOneAndUpdate({classId: req.params.classId}, { $push: { listStudent: classroom.listStudent } }, { new: true });
        res.json(newclassroom);
    }
))
// delete data
router.delete("/delete/:courseId/:classId", asynceHandler(
    async (req: Request, res: Response) => {
        const deletedclassroom = await ClassModel.findOneAndDelete({courseId: req.params.courseId, classId: req.params.classId});
        res.json(deletedclassroom);
    }
))
export default router;