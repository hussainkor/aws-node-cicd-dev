import userModel from "../models/user.model.js"

export const userList = async (req, res) => {
    try {
        const users = await userModel.find({})
        if (users.length === 0) return res.status(404).json({ status: "failed", message: "Record not found" })
        res.status(200).json({ data: users })
    } catch (error) {
        console.error("Something went wrong", error.message)
    }
}

export const userCreate = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body

        if (!name || !email || !phoneNumber) return res.status(400).json({ status: "failed", message: "all the fields are required" })

        const isExist = await userModel.findOne({ email: email })
        if (isExist) return res.status(400).json({ status: "failed", message: "Email already added" })
        const user = {
            name: name,
            email: email,
            phoneNumber, phoneNumber
        }
        await userModel.insertOne(user)
        return res.status(200).json({ status: "success", message: "User created", data: user })
    } catch (error) {
        console.error("Something went wrong", error.message)
    }
}

export const userUpdate = async (req, res) => {
    try {
        const { id } = req.params

        const { name, phoneNumber } = req.body
        const isExist = await userModel.findOne({ _id: id })
        if (!isExist) return res.status(400).json({ status: "failed", message: "User not found" })

        isExist.name = name || isExist.name
        isExist.phoneNumber = phoneNumber || isExist.phoneNumber

        await isExist.save()
        return res.status(200).json({ status: "success", message: "User updaated successfully" })
    } catch (error) {
        console.error("Something went wrong", error.message)
    }
}