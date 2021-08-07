const express = require('express')
const router = express.Router()
const Page = require("../models/Page")
const verifyTokenManager = require("../middleware/Auth_Manager")
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
        let updatePage = {
            pageStatus: pageStatus,
            pageUser: pageUser,
            updatedAt: new Date
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


// router.post("/view", async(req, res) => {
//     const{pageID, pageUser} = req.body
    
//     try {
//         const page = await Page.findOne({pageID})
//         const newPage = Page({
//             pageID: pageID,
//             pageUser: pageUser,
//         })
//         await newPage.save()

//         res.json({success: true, message: `Create successful Page: ${newPage.pageID}`})
//     } catch (error) {
//         console.log("FinTEST Ports: " + error.message)
//     }
// })
module.exports = router
