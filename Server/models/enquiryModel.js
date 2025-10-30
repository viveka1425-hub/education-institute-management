import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
    {
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
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        message:{
            type:String,
            trim:true
        },
        response:{
            type:String,
            trim:true
        },
        status: {
            type: String,
            enum: ["approved", "pending"],
            default: "pending",
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("institutes_Enquiry", enquirySchema);
