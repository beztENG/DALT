import { Router } from "express";
import {sample_users } from "../data";

const router = Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = sample_users.find(u => u.email === email && u.password === password);

    if (user) {
        return res.json({ success: true, user });
    } else {
        return res.status(401).json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu" });
    }
});

export default router;