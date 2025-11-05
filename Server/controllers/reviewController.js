import express, { request } from "express";
import reviewSchema from "../models/reviewModel.js";
import enquirySchema from "../models/enquiryModel.js";
import ProfileSchema from "../models/profileModel.js";
import mongoose from "mongoose";
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
        const { instituteId, id } = req.params;
        console.log({
            instituteId,
            type:typeof instituteId
        })
        const conditionQuery = {};
        if(instituteId && instituteId !== 'null'){
            conditionQuery.instituteId = new mongoose.Types.ObjectId(instituteId);
        }
        const result = await reviewSchema.countDocuments(conditionQuery)
        const enquiry = await enquirySchema.countDocuments(conditionQuery)
        const institute = await ProfileSchema.countDocuments({id:id})
        res.send({
            message: "get review count",
            result: result,
            enquiry: enquiry,
            institute:institute
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}
router.get("/reviewCount/:instituteId", reviewCount)

const reviewChart = async (req, res) => {
    try {
        const { instituteId } = req.query;
        let conditionQuery = {};
        if (instituteId) {
            conditionQuery = {
                instituteId: new mongoose.Types.ObjectId(instituteId)
            }
        }
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6); // last 7 days including today
        // Aggregate reviews grouped by day
        const data = await reviewSchema.aggregate([
            {
                $match: {
                    date: { $gte: sevenDaysAgo, $lte: today },
                    ...conditionQuery
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 }, // sort by day ascending
            },
        ]);
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];

            const found = data.find((d) => d._id === dateStr);
            last7Days.push({
                day: date.toLocaleDateString("en-US", { weekday: "short" }),
                reviews: found ? found.count : 0,
            });
        }

        res.json(last7Days);
    } catch (error) {
        console.error("Error fetching weekly review stats:", error);
        res.status(500).json({ message: "Server error" });
    }
};

router.get("/weeklyReview", reviewChart)

const enquiryChart = async (req, res) => {
    try {
        const { instituteId } = req.query;
        console.log({
            instituteId,
            type: typeof instituteId
        })
        const conditionQuery = {};
        if (instituteId && instituteId !== 'null') {
            conditionQuery.instituteId = new mongoose.Types.ObjectId(instituteId);
        }

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

        const data = await enquirySchema.aggregate([
            {
                $match: {
                    ...conditionQuery,
                    date: { $gte: sevenDaysAgo },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        const result = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const formatted = d.toISOString().split("T")[0];
            const found = data.find((item) => item._id === formatted);
            result.push({ date: formatted, count: found ? found.count : 0 });
        }

        res.json({
            success: true,
            message: "Enquiry count for the past 7 days fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error fetching enquiry stats:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching enquiry count",
        });
    }
};

router.get("/enquiryChart", enquiryChart)

export { router as reviewRouter };