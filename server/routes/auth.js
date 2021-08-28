require("dotenv").config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require("../models/Users")
const verifyToken = require("../middleware/Auth")
// Auth Login, View & Update Profile ✔✔✔

// @router GET api/Auth
// @desc Check if User is Logged in
// @Access Public

router.get("/", verifyToken, async (req, res) =>{
    try {
        const user = await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
         res.json({
            success: true,
            user
        })
    } catch (error) {
        console.log("FinTEST Auth: " + error.message)
    }
})

// @router POST api/Auth/login
// @desc Login User
// @Access Public

router.post("/login", async (req, res) =>{
    const {userEmail, userPassword} = req.body
    
    if(!userEmail || !userPassword){
        // Một biến mà bằng rỗng hoạc null thì được định nghĩa là false
        // Nếu 1 trong hai biến là true thì gửi lại tb lỗi
        return res.status(400).json({success: false, message: "Missing Email and/ or Password"})
    }
    try {
        // Check for existing user
        const user = await User.findOne({userEmail})
        if(!user){
            return res.status(400).json({success: false, message: "Incorrect Email"})
        }
        const passwordValid = await argon2.verify(user.userPassword, userPassword)
        if(!passwordValid){
            return res.status(400).json({success: false, message: "Incorrect Password"})
        }
        if(!user.userStatus){
            return res.json({success: false, message: "Your account has been locked. Please contact the manager for more information."})
        }
        const accessToken = jwt.sign({
            userId: user._id, 
            userEmail: user.userEmail,
            userName: user.userName, 
            userStatus: user.userStatus,
            userPosition: user.userPosition,
            exp: Date.now()/1000 + 28800
        }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
			success: true,
			message: 'User Logged in successfully',
			accessToken,
		})
    } catch (error) {
        console.log("FinTEST Auth: " + error.message)
    }
})

router.get("/profile", verifyToken, async (req, res) =>{
    const userEmail = req.userEmail
    try {
        const viewProfile = await User.findOne({userEmail})
        res.json({
			success: true,
			viewProfile
		})
    } catch (error) {
        console.log("FinTEST Auth: " + error.message)
    }
})
// @router PUT api/Auth/update
// @desc Update User
// @Access Private

router.put("/update", verifyToken, async (req, res) =>{
    const {userName, userBirthday, userAddress, userPassword, userNewPassword} = req.body
    if(!userName || !userPassword){
        // Một biến mà bằng rỗng hoạc null thì được định nghĩa là false
        // Nếu 1 trong hai biến là true thì gửi lại tb lỗi
        return res.status(400).json({success: false, message: "Missing Name and/ or Password"})
    }
    try {
        // Check for existing user
        const userEmail = req.userEmail
        const user = await User.findOne({userEmail})
        if(!user){
            return res.status(400).json({success: false, message: "Incorrect Email"})
        }
        
        const passwordValid = await argon2.verify(user.userPassword, userPassword)
        if(!passwordValid){
            
            return res.status(400).json({success: false, message: "Incorrect Password"})
        }
        const hashedPassword = await argon2.hash(userPassword)
        const hashedNewPassword = await argon2.hash(userNewPassword)
        var today = new Date();
        var utc = today.getTime() + 25200000;
        let updateUser = {
            userName: userName,
            userPassword: userNewPassword == "" ? hashedPassword : hashedNewPassword,
            userBirthday: userBirthday,
            userAddress: userAddress,
            updatedAt: new Date(utc)
        }
        const userUpdateCondition = {userEmail: userEmail}
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

module.exports = router