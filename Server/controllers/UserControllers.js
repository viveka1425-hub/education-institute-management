import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../utills/index.js";
const router = express.Router()

const registeruser = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phone, password, role } = req.body;
        if (!name || !phone || !email || !password || !role) {
            return res.status(400).json({ message: "Fill all file" })
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, phone, password: hashpassword, role })
        await user.save();

        res.status(201).json({ massage: "Register successfully" })

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
        const institute = institutes_users;
        console.log(password, institutes_users.password)

        const isMatch = await bcrypt.compare(password, institutes_users.password);

        if (!isMatch) {
            return res.status(401).json({ message: "incourrect password" });
        }
        const token = generateToken(institutes_users);
        res.json({
            token: token,
            id: institutes_users._id
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

router.post('/login', loginuser)
export {
    router as userrouter
};