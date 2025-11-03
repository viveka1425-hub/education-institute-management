import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import ProfileSchema from '../models/profileModel.js';
import reviewSchema from "../models/reviewModel.js";

import { generateToken } from "../utills/index.js";
import { authorizeToken } from "../middleware/authorize.js";
import { authorizeRole } from "../middleware/authorize-role.js";
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

const getUsername = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        const users = await User.findById(userId)
        console.log(users)
        if (!users) {
            return res.status(404).json({ message: "name not exists" })
        }

        else {
            return res.status(200).json({
                message: "users fetched successfully",
                data: users
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}
router.get('/getUserName/:userId', getUsername)

router.post('/register', registeruser)

const loginuser = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Fill all file" })
        }

        const users = await User.findOne({ email: email })
        console.log(users)
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

        if (users.status !== "approved") {
            return res.status(403).json({ message: "Institute not approved" })
        }



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
router.get('/pending', authorizeToken, authorizeRole(['admin']), getPendingUsers)

const getApprovedUser = async (req, res) => {
    try {
        const { searchText, state, fees, facilityName, rating, feeRange } = req.query;
        console.log({ searchText, state, fees, facilityName, rating, feeRange });
        const filters = {};

        if (searchText) {
            console.log('Is Executing Inside the SearchText....');
            filters['$or'] = [
                { name: { $regex: searchText, $options: "i" } },
                { address: { $regex: searchText, $options: "i" } },
                { description: { $regex: searchText, $options: "i" } }
            ]
        }
        if (state) {
            filters.state = state
        }
        if (fees) {
            if (feeRange === 'low') {
                filters["courses.fees"] = { $lt: 50000 };
            } else if (feeRange === 'medium') {
                filters["courses.fees"] = { $gte: 50000, $lte: 100000 };
            } else if (feeRange === 'high') {
                filters["courses.fees"] = { $gt: 100000 };
            }
        }

        if (facilityName) {
            filters["facility.name"] = facilityName;
        }

        let matchingInstituteIds = [];
        if (rating) {
            const avgRatings = await reviewSchema.aggregate([
                {
                    $group: {
                        _id: "$instituteId",
                        avgRating: { $avg: "$rating" },
                    },
                },
                {
                    $match: {
                        avgRating: { $gte: Number(rating) },
                    },
                },
            ]);
            matchingInstituteIds = avgRatings.map(r => r._id);
            console.log(matchingInstituteIds)
            if (matchingInstituteIds.length > 0) {
                filters._id = { $in: matchingInstituteIds };
            }
        }
        console.log('Final Filters', JSON.stringify(filters))
        let institutes = await ProfileSchema.find(filters).populate({
            path: "userId",
            match: { status: "approved" },
            feesRange: "fees",
            select: "name email phone status role"
        });

        institutes = institutes.filter(info => !!info.userId)

        res.status(200).json({
            message: "approve users fetched successfully",
            data: institutes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
}
//http://localhost:7007/approving?searchText=viveka&state=tamilnadu
//axios.get(`/api/institutes?search=${searchText}&feeRange=${feeRange}`);
router.get('/approving', getApprovedUser)

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