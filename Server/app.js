import dotenv from 'dotenv';
dotenv.config()
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { ProfileRouter } from './controllers/ProfileControllers.js'
import { dbConnect } from './config/db.js';
import { userrouter } from './controllers/UserControllers.js';

const app = express();

app.use(cors())
app.use(bodyParser.json()); // To parse the JSON Request Body
app.use(bodyParser.urlencoded({ extended: true })); // To parse the JSON Request Body
app.use(express.static('public'))

app.use(ProfileRouter)
app.use(userrouter)

app.listen(process.env.PORT, async () => {
    console.log(process.env.PORT)
    await dbConnect();
    console.log("Application is running on port 7007");
});