import express, { request } from "express";
import reviewSchema from "../models/reviewModel.js";
const router = express.Router()

const review = async (req, res) => {
    try {
        console.log(req.body)
        const { rating, reviewText, status, date } = req.body;
        if (!rating || !reviewText || !status || !date) {
            return res.status(400).json({ message: "fill all fields" })
        }
        const newStatus = status == "approved" ? "approved" : "rejected"
        const { userId, id } = req.params;

        const review = await reviewSchema.insertOne({
            userId: userId,
            instituteId: id,
            rating: rating,
            reviewText: reviewText,
            status: status,
            date: date
        });

        if (!review) {
            return res.status(404).json({ message: "review not exist" })
        }
        else {
            return res.send({
                message: "review successfully",
                userId: userId,
                instituteId: id,
                status: newStatus
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}
router.post("/review/:userId/:id", review)

const getReview = async (req, res) => {
    try {
        const { instituteId } = req.params;
        const collection = await reviewSchema.find({
            instituteId: instituteId,
            status: "approved"
        })
        .sort({ date: -1})
        .populate("userId", "name") 
        console.log(instituteId)
        res.send({
            message: "successfully get the data",
            collection: collection
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}
router.get("/reviewCollection/:instituteId", getReview)

export { router as reviewRouter };