import { Router, Request, Response } from 'express';
import { sample_student } from '../data';
import asynceHandler from 'express-async-handler'
import { StudentModel } from '../models/students.model';


const router = Router();

router.get("/seed", asynceHandler (
    async (req,res) => {
        const studentCount = await StudentModel.countDocuments();
        if(studentCount > 0){
            res.send("Seed is already done!");
            return;
        }
        await StudentModel.create(sample_student);
        res.send("Seed is done!");
    }
))

router.get('/students/registration-date', asynceHandler (
    async (req: Request, res: Response) => {
        try {
            const sortedStudents = sample_student.slice().sort((a, b) => {
                return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
            });
    
            res.json(sortedStudents);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
));

router.get('/students/search', 
    async (req: Request, res: Response) => {
        const { keyword } = req.query;
        if (typeof keyword !== 'string' || !keyword.trim()) {
            return res.status(400).json({ message: 'Invalid or missing search keyword' });
        }
    
        const filteredStudents = sample_student.filter((s) =>
            s.studentId.includes(keyword) ||
            s.studentName.toLowerCase().includes(keyword.toLowerCase()) ||
            s.phoneNumber.includes(keyword)
        );
    
        res.json(filteredStudents);
    });

export default router;
