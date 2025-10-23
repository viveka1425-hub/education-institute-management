import express from "express";
import multer from "multer";
import path from "path";
//import { image } from "../models/imageModel";
const router = express.Router()

// const imageSubmit = async(req,res) => {
//     try {
//         console.log("upload image")
//         const uploadImage = await image()
//         return res.json({
//             data: uploadImage
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:"server error"})
//     }
// }
// router.post("/image",imageSubmit)

// export { router as imageRouter };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        // Generate a unique filename to prevent overwriting
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    //res.send(500)(`Image uploaded successfully: ${req.file.filename}`);
    res.send({
        message:"Image upload successfully",
        file:`${req.file.filename}`
    })
});

export { router as imageRouter };