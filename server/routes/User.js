require("dotenv").config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require("../models/Users")
const verifyTokenManager = require("../middleware/Auth_Manager")
// Dùng để tạo và thay đổi thông tin User
// @router POST api/Auth/create
// @desc Create User
// @Access Private

router.post("/create", verifyTokenManager, async (req, res) =>{
    const {userEmail, userPassword, userPosition} = req.body
    if(!userEmail || !userPassword){
        // Một biến mà bằng rỗng hoạc null thì được định nghĩa là false
        // Nếu 1 trong hai biến là true thì gửi lại tb lỗi
        return res.status(400).json({success: false, message: "Missing Email and/ or Password"})
    }
    try {
        // Check for existing user
        const user = await User.findOne({userEmail})

        if(user){
            return res.status(400).json({success: false, message: "Email arready taken"})
        }
        const hashedPassword = await argon2.hash(userPassword)
        const newUser = new User({
            userEmail: userEmail, 
            userPassword: hashedPassword,
            userPosition: userPosition
        })
        await newUser.save()
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})

    } catch (error) {
        console.log("FinTEST Auth: " + error.message)
    }
})


router.put("/update/:id", verifyTokenManager, async (req, res) =>{
    const {userPosition, userStatus} = req.body
    if(!userPosition || !userStatus){
        return res.status(400).json({success: false, message: "Missing Position and/ or Status", userPosition, userStatus})
    }
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId})
        if(!user){
            return res.status(400).json({success: false, message: "User not found", userId})
        }
        let updateUser = {
            userPosition: userPosition,
            userStatus: userStatus,
            updatedAt: new Date
        }
        const userUpdateCondition = {_id: req.params.id}
        updateUser = await User.findOneAndUpdate(userUpdateCondition, updateUser, {new: true})
        res.json({
			success: true,
			message: 'Change successful information',
            updateUser
		})
    } catch (error) {
        console.log("FinTEST Auth: " + error.message)
    }
})

router.get("/view/:id", verifyTokenManager, async (req, res) =>{
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId})
        if(!user){
            return res.status(400).json({success: false, message: "User not found", userId})
        }
        res.json({
			success: true,
            user
		})
    } catch (error) {
        console.log("FinTEST Auth: " + error.message)
    }
})

router.get("/view", verifyTokenManager, async (req, res) =>{
    try {
        const user = await User.find()
        if(!user){
            return res.status(400).json({success: false, message: "User not found", userId})
        }res.json({
			success: true,
			user
		})
    } catch (error) {
        console.log("FinTEST Auth: " + error.message)
    }
})
module.exports = router