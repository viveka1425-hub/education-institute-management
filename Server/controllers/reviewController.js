import express, { request } from "express";
import reviewSchema from "../models/reviewModel.js";
import enquirySchema from "../models/enquiryModel.js";
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
            .sort({ date: -1 })
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

const getReviewAdmin = async (req, res) => {
    try {
        const { instituteId } = req.query;
        let conditionQuery;
        if (instituteId) {
            conditionQuery = {
                status: "approved",
                instituteId: instituteId,
            }
        } else {
            conditionQuery = {
                status: "approved"
            }
        }
        const userReviewDetails = await reviewSchema.find(conditionQuery)
            .populate("userId", "name")
            .populate("instituteId", "name")
        res.send({
            message: "get review",
            userReviewDetails: userReviewDetails
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}
router.get("/userReviewDetails", getReviewAdmin)


const rejectedReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updateReview = await reviewSchema.updateOne({ _id: reviewId }, {
            $set: {
                status: "rejected"
            }
        });
        res.send({
            message: "rejected successfully",
            updateReview: updateReview
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}
router.put("/statusUpdate/:reviewId", rejectedReview)

const reviewCount = async (req, res) => {
    try {
        const { instituteId } = req.params;
        const result = await reviewSchema.countDocuments({instituteId:instituteId})
        const enquiry = await enquirySchema.countDocuments({instituteId:instituteId})
        res.send({
            message: "get review count",
            result: result,
            enquiry:enquiry
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}
router.get("/reviewCount/:instituteId", reviewCount)

export { router as reviewRouter };