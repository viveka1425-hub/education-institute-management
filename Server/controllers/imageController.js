import express from "express";
import multer from "multer";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

router.post('/uploadss', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    //res.send(500)(`Image uploaded successfully: ${req.file.filename}`);
    res.send({
        message: "Image upload successfully",
        file: `${req.file.filename}`
    })
});



const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const memStorage = multer.memoryStorage();
const uploadMem = multer({ storage: memStorage });


router.post("/upload", uploadMem.single("image"), async (req, res) => {
    try {
        const file = req.file;
        const fileName = `uploads/${Date.now()}-${file.originalname}`;

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        res.json({ message: "✅ File uploaded successfully", file: fileUrl });
    } catch (err) {
        console.error("Upload failed:", err);
        res.status(500).json({ message: "❌ Upload failed" });
    }
});

export { router as imageRouter };