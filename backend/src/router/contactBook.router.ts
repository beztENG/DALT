import { Request, Response, Router } from "express";
import { StudentModel } from '../models/students.model';

const router = Router();

router.get('/students/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const studentInfo = await StudentModel.findOne({ email });

    if (!studentInfo) {
      return res.status(404).json({ message: 'Thông tin học sinh không tồn tại' });
    }

    res.json(studentInfo);
  } catch (error) {
    console.error('Lỗi khi truy xuất thông tin học sinh:', error);
    res.status(500).json({ message: 'Lỗi khi truy xuất thông tin học sinh', error });
  }
});

export default router;
