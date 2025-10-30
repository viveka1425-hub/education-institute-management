import express from "express";
import enquirySchema from "../models/enquiryModel.js"
const router = express.Router()

const instituteReplay = async (req, res) => {
    try {
        const { response } = req.body
        if(!response){
            return res.status(400).json({message:"send message"})
        }
        const { id } = req.params;
        let status = await enquirySchema.updateOne({_id:id},{
            $set:{
                status:"approved",
                response:response
            }
        })    
        res.send({
            message:"successfully send the message",
            status:status
        })
    } catch (error) {
        console.log(error)
        res.send(500).json({ message: "server error" })
    }
}
router.put("/instituteEnquiryReplay/:id", instituteReplay)

const institutionReplaySendForUser  = async (req,res) => {
    try {
        const { id } = req.params
        let data = await enquirySchema.find({_id:id})
        
        res.send({
            message:"replay send successfully",
            data:data
        })
    } catch (error) {
        console.log(error)
        res.send(500).json({message:"server error"})
    }
}

router.get("/institutionReplaySendForUser/:id", institutionReplaySendForUser)

export { router as enquiryReplayRouter };