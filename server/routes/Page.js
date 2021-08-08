const express = require('express')
const router = express.Router()
const Page = require("../models/Page")
const verifyTokenManager = require("../middleware/Auth_Manager")
const verifyToken = require('../middleware/Auth')
// Thay đổi trạng thái trang
// Hoạt dộng hoặc không hoạt dộng
// Không hoạt dộng thì Không thể tạo vé và sẽ không hiển thị thông tin vé đã bán đối với nhân viên
// router.post("/create", verifyTokenManager, async(req, res) => {
//     try {
//         const pageUser = req.userId
//         const page = await Page.findOne({pageID: "Asia_Park"})
//         const newPage = Page({
//             pageID: "Asia_Park",
//             pageStatus: false,
//             pageUser: pageUser,
//             updatedAt: new Date
//         })
//         newPage.save()
        
//         res.json({success: true, message: `SUPER PAGE`, newPage})
//     } catch (error) {
//         console.log("FinTEST Page: " + error.message)
//     }
// })
router.put("/update", verifyTokenManager, async(req, res) => {
    const {pageStatus} = req.body
    try {
        const pageUser = req.userId
        const page = await Page.findOne({pageID: "Asia_Park"})
        var today = new Date();
        var utc = today.getTime() + 25200000;
        let updatePage = {
            pageStatus: pageStatus,
            pageUser: pageUser,
            updatedAt: new Date(utc)
        }
        console.log("FinTEST Page: "+ page._id)
        const pageUpdateCondition = {pageID: "Asia_Park"}
        updatePage = await Page.findOneAndUpdate(pageUpdateCondition, updatePage, {new: true})
        if(!updatePage){
            return res.json({success: false, message: `FUCK`,pageUpdateCondition, updatePage})
        }
        
        res.json({success: true, message: `Page status update successful`, updatePage})
    } catch (error) {
        console.log("FinTEST Page: " + error.message)
    }
})


router.get("/view", verifyToken, async(req, res) => {
    try {
        const viewPage = await Page.find().populate("pageUser", [
            "userName",
            "userEmail",
            "userPosition"
        ])
        res.json({success: true, message: `Site query successful!`, viewPage})
    } catch (error) {
        console.log("FinTEST Page: " + error.message)
    }
})
module.exports = router
