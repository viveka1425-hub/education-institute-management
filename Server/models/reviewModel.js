import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    instituteId: {
        type: mongoose.Types.ObjectId,
        ref: "institutes_profile",
        required: true,
    },
    reviewId:{
        type:mongoose.Types.ObjectId,
        ref:"_id",
        require:true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    reviewText: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        enum: ["approved", "rejected"],
        default: "approved",
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.model("institutes_review", reviewSchema)