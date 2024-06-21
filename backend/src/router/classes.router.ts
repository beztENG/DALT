import { Request, Response, Router } from "express";
import asyncHandler from 'express-async-handler'
import { ClassModel } from "../models/classes.model";

const router = Router();

// Get all classes
router.get("/all", asyncHandler(async (req: Request, res: Response) => {
    const classrooms = await ClassModel.find().exec();
    res.json(classrooms);
}));

// Get class by courseId
router.get("/get/:courseId", asyncHandler(async (req: Request, res: Response) => {
    const classroom = await ClassModel.find({ courseId: req.params.courseId }).exec();
    res.json(classroom);
}));

//get one class
router.get("/get/:courseId/:classId", asyncHandler(async (req: Request, res: Response) => {
    const classroom = await ClassModel.findOne({ courseId: req.params.courseId, classId: req.params.classId }).exec();
    res.json(classroom);
}));

//get one by id
router.get("/getid/:id", async (req: Request, res: Response) => {
    const classcourse = await ClassModel.findById(req.params.id);
    res.json(classcourse);
});

// Create a new class
router.post("/add", asyncHandler(async (req: Request, res: Response) => {
    const classroom = req.body;
    const newClassroom = await ClassModel.create(classroom);
    res.json(newClassroom);
}));

// Add student to class
router.post("/addStudent/:classId", asyncHandler(async (req: Request, res: Response) => {
    const studentId = req.body.studentId;
    const updatedClassroom = await ClassModel.findOneAndUpdate(
        { classId: req.params.classId },
        { $push: { listStudent: studentId } },
        { new: true }
    );
    res.json(updatedClassroom);
}));

// Delete class
router.delete("/delete/:courseId/:classId", asyncHandler(async (req: Request, res: Response) => {
    const deletedClassroom = await ClassModel.findOneAndDelete({ courseId: req.params.courseId, classId: req.params.classId });
    res.json(deletedClassroom);
}));
// Delete class by courseID
router.delete("/delete/:courseId", asyncHandler(async (req: Request, res: Response) => {
    const deletedClassroom = await ClassModel.deleteMany({ courseId: req.params.courseId });
    res.json(deletedClassroom);
}));

export default router;
