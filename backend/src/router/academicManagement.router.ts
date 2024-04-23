import { Router, Request, Response } from 'express';
import { sample_student } from '../data';
import asynceHandler from 'express-async-handler'
import { StudentModel } from '../models/students.model';


const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const studentCount = await StudentModel.countDocuments();
        if (studentCount > 0) {
            res.send("Seed is already done!");
            return;
        }
        await StudentModel.create(sample_student);
        res.send("Seed is done!");
    }
))

router.get('/students/registration-date', asynceHandler(
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

router.post('/students/add', async (req: Request, res: Response) => {
    try {
        const { studentId, studentName, email, password, phoneNumber, registrationDate, midtermGrade, finalGrade } = req.body;
        if (!studentId || !studentName || !email || !password || !phoneNumber || !registrationDate || !midtermGrade || !finalGrade) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const existingStudent = await StudentModel.findOne({ $or: [{ studentId }, { phoneNumber }] });
        if (existingStudent) {
            return res.status(409).json({ message: 'Student ID or phone number already exists' });
        }
        const newStudent = await StudentModel.create({
            studentId,
            studentName,
            phoneNumber,
            email,
            password,
            registrationDate,
            midtermGrade,
            finalGrade
        });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
router.put('/students/:studentId/update', async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const { studentName, email, password, phoneNumber, registrationDate, midtermGrade, finalGrade } = req.body;

        const student = await StudentModel.findOneAndUpdate(
            { studentId: studentId },
            { $set: { studentName, email, password, phoneNumber, registrationDate, midtermGrade, finalGrade } },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
router.delete('/students/:studentId/delete', async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const student = await StudentModel.findOneAndDelete({ studentId: studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
export default router;
