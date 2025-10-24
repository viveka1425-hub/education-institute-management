import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            require: true
        },
        id: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true,
        },
        tagline: {
            type: String
        },
        description: {
            type: String
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            match: /\S+@\S+\.\S+/, // Regex Pattern
        },
        phone: {
            type: String,
            require: true,
            minlength: 10
        },
        website: {
            type: String
        },
        address: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        pincode: {
            type: String
        },
        year: {
            type: Number
        },
        accreditation: {
            type: String,
        },
        head: {
            type: String,
        },
        contactPerson: {
            type: String,
        },
        logo: {
            type: String,
        },
        banner: {
            type: String,
        },
        gallery: {
            type: Array
        },
        social: {
            facebook: { type: String, trim: true },
            twitter: { type: String, trim: true },
            linkedin: { type: String, trim: true },
        },
        courses: [{
            id: {
                type: Number,
                require: true
            },
            name: {
                type: String
            },
            ShortCode: {
                type: Number
            },
            category: {
                type: String,
                enum: ["Undergraduate", "postgraduate", "diploma", "Certification"],
                required: true,
                default: "user"
            },
            duration: {
                type: String
            },
            mode: {
                type: String,
                enum: ["Full-time", "Part-time", "online"],
                required: true
            },
            eligibility: {
                type: String
            },
            description: {
                type: String
            },
            fees: {
                type: Number
            },
            intake: {
                type: Number
            },
            image: {
                type: String
            },
            startDate: {
                type: String
            },
            endDate: {
                type: String
            },
        }],

        facility: [{
            id: {
                type: String,
                require: true
            },
            name: {
                type: String,
                required: true
            },
            category: {
                type: String
            },
            description: {
                type: String
            },
            photo: {
                type: String
            },
            available: {
                type: Boolean,
                default: true
            },
            capacity: {
                type: String
            },
            location: {
                type: String
            },
        }],
    },
    { timestamps: true }
);


export default mongoose.model("institutes_profile", ProfileSchema)