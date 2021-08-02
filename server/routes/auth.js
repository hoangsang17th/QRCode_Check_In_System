require("dotenv").config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require("../models/Users")
// router.get("/", (req, res) => res.send("User Router"))

// @router POST api/Users/create
// @desc Create User
// @Access Private

router.post("/create", async (req, res) =>{
    const {userEmail, userPassword, userPossition} = req.body
    
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
            userPossition: userPossition
        })
        await newUser.save()
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})

    } catch (error) {
        console.log("FinTEST " + error.message)
    }
    

})
module.exports = router