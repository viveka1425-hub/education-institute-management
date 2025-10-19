import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';


async function dbConnect() {
    const url = process.env.DBURL;
    const dbName = process.env.DBNAME;
    await mongoose.connect(url + '/' + dbName);
}




export { dbConnect };
