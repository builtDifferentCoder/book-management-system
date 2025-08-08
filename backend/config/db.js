import mongoose from "mongoose";
import logger from "../logger/logger.js";

const connectToDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info("Connected to DB");
        console.log("Connected to DB");
    }catch(err){
        logger.error(err)
        console.error("MongoDB connection error:", err)
        process.exit(1)
    }
}

export default connectToDb;