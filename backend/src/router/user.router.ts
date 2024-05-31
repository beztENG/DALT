import { Request, Response, Router } from "express";
import { sample_users } from "../data";
import asyncHandler from 'express-async-handler';
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET_KEY = "123456";

router.get("/seed", asyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
        res.send("Seed is already done!");
        return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done!");
}));

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });

    if (user) {
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ success: true, user, token });
    } else {
        return res.status(401).json({ success: false, message: "Incorrect username or password" });
    }
});

export default router;
