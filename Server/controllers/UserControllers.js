import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import ProfileSchema from '../models/profileModel.js';

import { generateToken } from "../utills/index.js";
const router = express.Router()

const registeruser = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phone, password, role } = req.body;
        if (!name || !phone || !email || !password || !role) {
            return res.status(400).json({ message: "Fill all file" })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        let status = "approved";

        if (role == "institute") {
            status = "pending";
        }
        const user = new User({ name, email, phone, password: hashPassword, role, status })
        await user.save();
        console.log(user)

        res.status(201).json({ massage: "Register successfully", id: user._id })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
};

router.post('/register', registeruser)

const loginuser = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Fill all file" })
        }

        const users = await User.findOne({ email: email })
        if (!users) {
            return res.status(400).json({ message: "email not exists" })
        }

        console.log(password, users.password)

        const isMatch = await bcrypt.compare(password, users.password);

        if (!isMatch) {
            return res.status(401).json({ message: "incorrect password" });
        }
        const token = generateToken(users);

        const userInstitute = await ProfileSchema.findOne({ userId: users._id })

        res.json({
            token: token,
            id: users._id,
            instituteId: userInstitute ? userInstitute._id : null,
            role: users.role
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}


router.post('/login', loginuser)

const getPendingUsers = async (req, res) => {
    try {
        let institutes = await ProfileSchema.find().populate({
            path: "userId",        // Join User collection
            match: { status: "pending" }, // Filter joined data
            select: "name email phone status role"
        });

        institutes = institutes.filter(info => !!info.userId)
        console.log(institutes);

        res.status(200).json({
            message: "Pending users fetched successfully",
            data: institutes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
};
router.get('/pending', getPendingUsers)

const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { action } = req.body;
        console.log(action)
        if (!["accept", "reject"].includes(action)) {
            return res.status(400).json({ message: "Invalid action type" });
        }

        const newStatus = action === "accept" ? "approved" : "rejected"; //ternary condition

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { status: newStatus },
            { new: true }// return updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({
            message: `user ${action}ed successfully`, // string litrals
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
router.put("/status/:userId", updateUserStatus);

export {
    router as userrouter
};