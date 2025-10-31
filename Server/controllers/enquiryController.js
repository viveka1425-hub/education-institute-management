import express from "express";
import enquirySchema from "../models/enquiryModel.js";
const router = express.Router()

const enquiry = async (req, res) => {
    try {
        const { name, email, phone, subject, message, status, date } = req.body
        if (!name || !email || !phone || !subject || !message || !status || !date) {
            return res.status(400).json({ message: "fill all fields" })
        }
        const customerStatus = status == "pending" ? "pending" : "approved"
        const { userId, id } = req.params;

        const enquiry = await enquirySchema.insertOne({
            userId: userId,
            instituteId: id,
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message,
            status: status,
            date: date
        })

        if (!enquiry) {
            return res.status(404).json({ message: "enquiry is not exist" })
        }
        else {
            return res.send({
                userId: userId,
                instituteId: id,
                status: customerStatus,
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                date: date
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

router.post("/enquiry/:id/:userId", enquiry)

const getEnquiry = async (req, res) => {
    try {
        const { userId, instituteId } = req.query;
        console.log(userId)
        console.log(instituteId)

        let filters = {};
        if (userId) {
            filters.userId = userId
        }if (instituteId) {
            filters.instituteId = instituteId
            filters.status = 'pending'
        }
        else {
            return res.status(400).json({ message: "Sender ID is required" });
        }
        console.log(filters)
        const institute_Enquiry = await enquirySchema.find(filters)
        res.status(200).json({
            message: "Enquiry List",
            data: institute_Enquiry
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}
router.get("/getEnquiry", getEnquiry)

export { router as enquiryRouter };