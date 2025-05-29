import express from "express"
import multer from "multer"
import path from "path"

import { userCreate, userList, userUpdate } from "../controller/userController.js"

const userRoute = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

userRoute.get("/list", userList)
userRoute.post("/create", upload.single("coverImage"), userCreate)
userRoute.put('/update/:id', userUpdate)

export default userRoute