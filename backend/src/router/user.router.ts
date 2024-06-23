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

router.get('/account/:email', asyncHandler(async(req,res) => {
    const user = await UserModel.findOne({email: req.params.email})
    res.json(user);
}))

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

router.post('/users/add', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password, address, role } = req.body;

        // Check if all required fields are provided
        if (!id || !name || !email || !password || !address || !role) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if id and email already exists
        const existingUser = await UserModel.findOne({ $or: [{ id }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User ID or email already exists' });
        }

        // Create new user
        const newUser = await UserModel.create({
            id,
            name,
            email,
            password,
            address,
            role: 'student'
        });

        // Return the newly created user
        return res.status(201).json(newUser);
    } catch (error) {
        // Handle any other errors
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.put('/users/:id/update', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, password, address } = req.body;

        const user = await UserModel.findOneAndUpdate(
            { id: id },
            { $set: { name, email, password, address } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
router.delete('/users/:id/delete', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findOneAndDelete({ id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

});
//change password user
router.put('/account/:email/change-password', async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const { password } = req.body;
        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { $set: { password } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
export default router;
