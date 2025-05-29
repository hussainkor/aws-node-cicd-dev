import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb connected");

    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message)
    }
}

export default dbConnect