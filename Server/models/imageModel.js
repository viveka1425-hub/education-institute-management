import mongoose from "mongoose";

const image = new mongoose.Schema({
    imageUrl:{
        type:String,
        require:true
    },
},
{ timestamps: true },)

export default mongoose.model("institutes_image", image)
