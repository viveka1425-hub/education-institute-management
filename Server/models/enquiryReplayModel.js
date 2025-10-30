import mongoose from "mongoose";

const instituteReplaySchema = new mongoose.Schema(
    {
        instituteId:{
            type:mongoose.Types.ObjectId,
            require:true,
        },
        message:{
            type:String,
            require:true
        },
    },
    {timestamps:true}
);

export default mongoose.model("institute_EnquiryReplay", instituteReplaySchema)