const express = require('express')
const router = express.Router()
const Ticket = require("../models/Tickets")


// @route POST api/Ports/create
// @desc Create Port
// @Access Private

router.post("/create", async(req, res) => {
    const{portName, portUser, portDescription, portStatus} = req.body

    // Simple validation
    if (!portName){
        return res.status(400).json({success: false, message: "Port Name is required"})
    }
    try {
        const newPort = new Port({
            portName: portName,
            portUser: portUser,
            portDescription: portDescription,
            portStatus: portStatus
        })
        await newPort.save()

        res.json({success: true, message: `Create successful Port: ${newPort._id}`})
    } catch (error) {
        console.log("FinTEST Ports: " + error.message)
    }
})

module.exports = router