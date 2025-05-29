import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"
import dotenv from "dotenv"

import userRoute from "./routes/user.route.js"
import dbConnect from "./config/dbConfig.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const dirname = path.resolve();
app.use('/public', express.static(path.join(dirname, '/public')));

app.get("/api", (req, res) => {
    res.json({ status: 200, message: "Application is running" })
})
app.use("/api/users", userRoute)

app.listen(PORT, () => {
    console.log(`App is running on the port ${PORT}`);
    dbConnect()
})