import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StudentModel } from '../models/students.model';
import { ClassModel } from '../models/classes.model';
import { CourseModel } from '../models/courses.model';
import { UserModel } from '../models/user.model';
import { sample_student } from '../data';

const router = Router();

// Seed route to populate the database with sample students
router.get("/seed", asyncHandler(async (req, res) => {
    const studentCount = await StudentModel.countDocuments();
    if (studentCount > 0) {
        res.send("Seed is already done!");
        return;
    }
    await StudentModel.create(sample_student);
    res.send("Seed is done!");
}));

// Route to get students sorted by registration date
router.get('/students/registration-date', asyncHandler(async (req: Request, res: Response) => {
    const students = await StudentModel.find().exec();
    const sortedStudents = students.slice().sort((a, b) => {
        return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
    });
    res.json(sortedStudents);
}));

// Route to search for students based on keyword
router.get('/students/search', async (req: Request, res: Response) => {
    const { keyword } = req.query;
    if (typeof keyword !== 'string' || !keyword.trim()) {
        return res.status(400).json({ message: 'Invalid or missing search keyword' });
    }

    try {
        const filteredStudents = await StudentModel.find({
            $or: [
                { studentId: { $regex: keyword, $options: 'i' } },
                { studentName: { $regex: keyword, $options: 'i' } },
                { phoneNumber: { $regex: keyword, $options: 'i' } }
            ]
        });
        res.json(filteredStudents);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get one by id
router.get('/students/:id', async (req: Request, res: Response) => {
    const student = await StudentModel.findById(req.params.id);
    res.json(student);
});


// Route to add a new student and a corresponding user
router.post('/students/add', async (req: Request, res: Response) => {
    try {
        const { studentId, studentName, email, password, phoneNumber, registrationDate, midtermGrade, finalGrade } = req.body;

        // Check if all required fields are provided
        if (!studentId || !studentName || !email || !password || !phoneNumber || !registrationDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if studentId, phoneNumber, or email already exists
        const existingStudent = await StudentModel.findOne({ $or: [{ studentId }, { phoneNumber }, { email }] });
        if (existingStudent) {
            return res.status(409).json({ message: 'Student ID, phone number, or email already exists' });
        }

        // Create new student
        const newStudent = await StudentModel.create({
            studentId,
            studentName,
            email,
            password,
            phoneNumber,
            registrationDate,
            midtermGrade,
            finalGrade
        });

        // Create corresponding user
        const newUser = await UserModel.create({
            id: studentId,
            name: studentName,
            email,
            password,
            address: phoneNumber,
            role: 'student'
        });

        // Return the newly created student
        return res.status(201).json(newStudent);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Route to update student and corresponding user details
router.put('/students/:studentId/update', async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const { studentName, email, password, phoneNumber, registrationDate } = req.body;

        // Update student details
        const updatedStudent = await StudentModel.findOneAndUpdate(
            { studentId: studentId },
            { $set: { studentName, email, password, phoneNumber, registrationDate } },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update corresponding user details
        const updatedUser = await UserModel.findOneAndUpdate(
            { id: studentId },
            { $set: { name: studentName, email, password, address: phoneNumber } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Route to delete student and corresponding user
router.delete('/students/:studentId/delete', async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        // Delete student
        const deletedStudent = await StudentModel.findOneAndDelete({ studentId: studentId });
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Delete corresponding user
        const deletedUser = await UserModel.findOneAndDelete({ id: studentId });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Student and user deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
router.post("/students/:studentId/enroll/:classId", async (req: Request, res: Response) => {
    try {
        const { studentId, classId } = req.params;

        const student = await StudentModel.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const classObj = await ClassModel.findOne({ classId });
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }

        student.classes.push(classObj._id);
        await student.save();

        classObj.listStudent.push(student._id);
        await classObj.save();

        res.status(200).json({ message: 'Student enrolled in class successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
router.get('/students/:studentId/classes', async (req: Request, res: Response) => {
    const { studentId } = req.params;
    try {
        const student = await StudentModel.findOne({ studentId }).populate('classes');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student.classes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});




export default router;
