import express, { Request, Response } from 'express';
import Teacher, { ITeacher } from '../models/teacher.model';

const router = express.Router();

// Helper function to parse time strings (e.g., "3:00pm - 5:00pm")
const parseTime = (time: string) => {
    const [start, end] = time.split(' - ').map(t => {
        const [hour, minutePart] = t.split(':');
        const minute = parseInt(minutePart, 10);
        const period = minutePart.slice(-2);
        let hourNum = parseInt(hour, 10);
        if (period.toLowerCase() === 'pm' && hourNum !== 12) hourNum += 12; 
        if (period.toLowerCase() === 'am' && hourNum === 12) hourNum = 0;
        return hourNum * 60 + minute;
    });
    return { start, end };
};

// Check for timeline conflicts
const hasConflict = async (teachingClass: string, periods: string[], timeline: string, teacherId: string | null = null) => {
    const { start: newStart, end: newEnd } = parseTime(timeline);
    const teachers = await Teacher.find({ teachingClass, periods: { $in: periods } });
    for (const teacher of teachers) {
        if (teacherId && teacher._id.equals(teacherId)) continue; 
        const { start, end } = parseTime(teacher.timeline);
        if ((newStart < end && newStart >= start) || (newEnd > start && newEnd <= end) || (newStart <= start && newEnd >= end)) {
            return true;
        }
    }
    return false;
};

// GET all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new teacher
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, phoneNum, teachingClass, duration, periods, timeline } = req.body;
        if (await hasConflict(teachingClass, periods, timeline)) {
            return res.status(400).send('Time conflict detected for the specified class and period.');
        }
        const newTeacher = new Teacher({ name, phoneNum, teachingClass, duration, periods, timeline });
        await newTeacher.save();
        res.status(201).send(newTeacher);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a teacher by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, phoneNum, teachingClass, duration, periods, timeline } = req.body;
        if (await hasConflict(teachingClass, periods, timeline, id)) {
            return res.status(400).send('Time conflict detected for the specified class and period.');
        }
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, { name, phoneNum, teachingClass, duration, periods, timeline }, { new: true });
        res.status(200).send(updatedTeacher);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a teacher by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Teacher.findByIdAndDelete(id);
        res.status(200).send({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;
