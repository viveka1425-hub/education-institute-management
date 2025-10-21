import express from "express";
import ProfileSchema from '../models/profileModel.js';
const router = express.Router()

const profileSubmit = async (req, res) => {
    try {
        console.log(req.body)
        const { userId, name, email, phone, address, city, state, country, pincode, year } = req.body;
        if (!userId || !name || !email || !phone || !address || !city || !state || !country || !pincode || !year) {
            return res.status(400).json({ message: "Fill Mandatory fields" });
        }
        
        const resp = await ProfileSchema.insertOne(req.body);
        res.send({
            success: true,
            message: 'Institute Created Successfully',
            instituteId: resp._id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" })
    }
}

router.post("/profile-submit", profileSubmit)

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProfile = await ProfileSchema.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // returns updated doc & applies validation
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json({
            message: "profile update successfully"
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};


router.put("/profile-update/:id", updateProfile)

async function profileList(req, res) {
    try {
        console.log("profile List is working")
        console.log(req.params)
        const { id } = req.params;
        const data = await ProfileSchema.findById(id);
        res.send({ success: true, data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
}

router.get("/profile-List/:id", profileList)




export { router as ProfileRouter };

