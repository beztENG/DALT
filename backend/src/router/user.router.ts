import { Request, Response, Router } from "express";
import { sample_users } from "../data";
import asynceHandler from 'express-async-handler'
import { UserModel } from "../models/user.model";
    
const router = Router();

router.get("/seed", asynceHandler (
    async (req,res) => {
        const userCount = await UserModel.countDocuments();
        if(userCount > 0){
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed is done!");
    }
))

router.post("/login", async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    const user = await UserModel.findOne({ email, password, role });

    if (user) {
        return res.json({ success: true, user });
    } else {
        return res.status(401).json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu" });
    }
});



export default router;
