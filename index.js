import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"
import dotenv from "dotenv"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb connected");

    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message)
    }
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

dbConnect()

app.get("/api", (req, res) => {
    res.json({ status: 200, message: "Application is running" })
})
app.use("/api/users", userRoute)

app.listen(PORT, () => {
    console.log(`App is running on the port ${PORT}`);
})