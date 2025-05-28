import express from "express"
import { userCreate, userList, userUpdate } from "../controller/userController.js"

const userRoute = express.Router()

userRoute.get("/list", userList)
userRoute.post("/create", userCreate)
userRoute.put('/update/:id', userUpdate)

export default userRoute