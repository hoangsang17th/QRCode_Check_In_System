const express = require('express')
const router = express.Router()
const Ticket = require("../models/Tickets")
const verifyToken = require("../middleware/Auth")
const verifyTokenManager = require("../middleware/Auth_Manager")
const Type = require("../models/Types")

router.post("/create",verifyToken, async(req, res) => {
    const{ticketCustomer, ticketType} = req.body

    // Simple validation
    if (!ticketCustomer){
        return res.status(400).json({success: false, message: "Customer Name is required"})
    }
    try {
        const viewType = await Type.findOne({_id: ticketType})
        
        console.log(viewType.typePrice)
        const ticketUser = req.userId
        
        const newTicket = new Ticket({
            ticketCustomer: ticketCustomer,
            ticketType: ticketType,
            ticketUser: ticketUser,
            ticketPrice: viewType.typePrice,
        })
        await newTicket.save()

        res.json({success: true, message: `Create successful Ticket: ${newTicket._id}`, newTicket})
    } catch (error) {
        console.log("FinTEST Tickets: " + error.message)
    }
})

// Đã Xong
router.get("/viewStaff",verifyToken, async(req, res) => {
    try { 
        const ticketUser= req.userId
        const ticketViewCondition = {ticketUser: ticketUser}
        const viewTicket = await Ticket.find(ticketViewCondition).populate("ticketUser", [
            "userName",
            "userEmail",
            "userPosition"
        ]).populate("ticketType", [
            "typeName",
            "typePrice"
        ])
        res.json({success: true, viewTicket})
    } catch (error) {
        console.log("FinTEST Ports: " + error.message)
    }
})

router.get("/viewManager",verifyTokenManager, async(req, res) => {
    try { 
        const viewTicket = await Ticket.find().populate("ticketUser", [
            "userName",
            "userEmail",
            "userPosition"
        ]).populate("ticketType", [
            "typeName",
            "typePrice"
        ])
        if(!viewTicket){
            return res.status(401).json({success: false, message: `Port not found with Port ID =  ${req.params.id}`})
        }
        res.json({success: true, viewTicket})
    } catch (error) {
        console.log("FinTEST Ports: " + error.message)
    }
})

router.get("/viewStaff/:id", verifyToken, async(req, res) => {
    try { 
        const ticketViewCondition = {_id: req.params.id, ticketUser: req.userId}
        const viewTicket = await Ticket.findOne(ticketViewCondition).populate("ticketUser", [
            "userName",
            "userEmail",
            "userPosition"
        ]).populate("ticketType", [
            "typeName",
            "typePrice"
        ])
        if(!viewTicket){
            return res.status(401).json({success: false, message: `Ticket not found with Ticket ID =  ${req.params.id}`})
        }
        res.json({success: true, viewTicket})
    } catch (error) {
        console.log("FinTEST Ports: " + error.message)
    }
})

router.get("/view/:id", verifyToken, async(req, res) => {
    try { 
        const ticketViewCondition = {_id: req.params.id}
        const viewTicket = await Ticket.findOne(ticketViewCondition)
        if(!viewTicket){
            return res.status(401).json({success: false, message: `Ticket not found with Ticket ID =  ${req.params.id}`})
        }
        res.json({
            _id: viewTicket._id,
            ticketStatus: viewTicket.ticketStatus,
            ticketType: viewTicket.ticketType,
            ticketCustomer: viewTicket.ticketCustomer,

        })
    } catch (error) {
        console.log("FinTEST Ports: " + error.message)
    }
})
router.get("/viewManager/:id",verifyTokenManager, async(req, res) => {
    try { 
        const ticketViewCondition = {_id: req.params.id}
        const viewTicket = await Ticket.findOne(ticketViewCondition).populate("ticketUser", [
            "userName",
            "userEmail",
            "userPosition"
        ]).populate("ticketType", [
            "typeName",
            "typePrice"
        ])
        if(!viewTicket){
            return res.status(401).json({success: false, message: `Port not found with Port ID =  ${req.params.id}`})
        }
        res.json({success: true, viewTicket})
    } catch (error) {
        console.log("FinTEST Ports: " + error.message)
    }
})

router.put("/updateManager/:id" ,verifyTokenManager, async(req, res) => {
    const{ticketCustomer, ticketType, ticketStatus} = req.body
    if (!ticketCustomer){
        return res.status(400).json({success: false, message: "Customer Name is required"})
    }
    try {
        const ticketUser = req.userId
        var today = new Date();
        var utc = today.getTime() + 25200000;
        let updateTicket = {
            ticketCustomer: ticketCustomer,
            ticketType: ticketType,
            ticketUser: ticketUser,
            ticketStatus: ticketStatus,
            updatedAt: new Date(utc)
        }
        const ticketUpdateCondition = {_id: req.params.id}
        updateTicket = await Ticket.findOneAndUpdate(ticketUpdateCondition, updateTicket, {new: true})

        if(!updateTicket){
            return res.status(401).json({success: false, message: `Ticket not found with Ticket ID =  ${req.params.id}`})
        }
        res.json({success: true, message: `Update Ticket success with Ticket ID =  ${req.params.id}`, updateTicket})
    } catch (error) {
        console.log("FinTEST Tickets: " + error.message)
    }
})

router.put("/updateStaff/:id" ,verifyToken, async(req, res) => {
    const{ticketCustomer, ticketType} = req.body
    if (!ticketCustomer){
        return res.status(400).json({success: false, message: "Customer Name is required"})
    }
    try {
        const ticketUser = req.userId
        var today = new Date();
        var utc = today.getTime() + 25200000;
        let updateTicket = {
            ticketCustomer: ticketCustomer,
            ticketType: ticketType,
            updatedAt: new Date(utc)
        }
        const ticketUpdateCondition = {_id: req.params.id, ticketUser: ticketUser}
        updateTicket = await Ticket.findOneAndUpdate(ticketUpdateCondition, updateTicket, {new: true})

        if(!updateTicket){
            return res.status(401).json({success: false, message: `Ticket not found with Ticket ID =  ${req.params.id}`})
        }
        res.json({success: true, message: `Update Ticket success with Ticket ID =  ${req.params.id}`, updateTicket})
    } catch (error) {
        console.log("FinTEST Tickets: " + error.message)
    }
})
// Phần View System 
// Chưa làm đâu
// Lấy ID từ vé để tra cứu thể loại vé và tình trạng vé
// Xem xét vé vào có hơp lệ với cổng này không
// Nếu không thì thông báo lỗi vé không hợp lệ
// Nếu hợp lệ thì trả về kết quả true
// Xem xét xem đó có phải cổng ra khỏi khi vui chơi không?
// Nếu là cổng ra thì set tình trạng vé về false và mở cổng

router.get("/viewSystem/:id",verifyTokenManager, async(req, res) => {
    try { 
        const ticketViewCondition = {_id: req.params.id}
        const viewTicket = await Ticket.findOne(ticketViewCondition).populate("ticketUser", [
            "userName",
            "userEmail",
            "userPosition"
        ]).populate("ticketType", [
            "typeName",
            "typePrice"
        ])
        if(!viewTicket){
            return res.status(401).json({success: false, message: `Port not found with Port ID =  ${req.params.id}`})
        }
        res.json({success: true, viewTicket})
    } catch (error) {
        console.log("FinTEST Ports: " + error.message)
    }
})


module.exports = router