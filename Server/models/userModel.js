import mongoose from "mongoose";
const profile = mongoose.Schema;

const user = new profile(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            match: /\S+@\S+\.\S+/
        },
        phone: {
            type: Number,
            require: true
        },
        password: {
            type: "string",
            require: true,
            minlength: 3
        },
        role: {
            type: String,
            enum: ["user", "institute", "admin"], 
            required: true,
            default: "user"
        },
        status:{
            type: String,
            default: "active"
        },
        waitingList: {
            type:Boolean,
            default:false
        },
    }, { timestamps: true }
);

export default mongoose.model("users", user)