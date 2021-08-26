const express = require('express')
const router = express.Router()
const Port = require("../models/Ports")
const verifyTokenManager = require("../middleware/Auth_Manager")
// View All _ View Detail _ Create _ Update _ Delete

// @route GET api/Ports/view
// @desc View All Port
// @Access Private

router.get("/view", verifyTokenManager, async(req, res) => {
    try {
        const viewPorts = await Port.find().sort({_id : -1}).populate("portUser", [
            "userName",
            "userEmail",
            "userPosition"
        ])
        res.json({success: true, viewPorts})
    } catch (error) {
        console.log("FinTEST View Ports: " + error.message)
    }
})

// @route GET api/Ports/view/:id
// @desc View Port
// @Access Private

router.get("/view/:id", verifyTokenManager, async(req, res) => {
    try {
        const portViewCondition = {_id: req.params.id}
        const viewPort = await Port.find(portViewCondition).populate("portUser", [
            "userName",
            "userEmail",
            "userPosition"
        ])
        if(!viewPort){
            return res.status(401).json({success: false, message: `Port not found with Port ID =  ${req.params.id}`})
        }
        res.json({success: true, viewPort})
    } catch (error) {
        console.log("FinTEST View Ports: " + error.message)
    }
})
// @route POST api/Ports/create
// @desc Create Port
// @Access Private

router.post("/create", verifyTokenManager, async(req, res) => {
    const{portName, portDescription, portStatus} = req.body

    // Simple validation
    if (!portName){
        return res.status(400).json({success: false, message: "Port Name is required"})
    }
    try {
        const newPort = new Port({
            portName: portName,
            portUser: req.userId,
            portDescription: portDescription,
            portStatus: portStatus
        })
        await newPort.save()
        res.json({success: true, newPort})
    } catch (error) {
        console.log("FinTEST Create Ports: " + error.message)
    }
})

// @route PUT api/Ports/update
// @desc Update Port
// @Access Private

router.put("/update/:id" ,verifyTokenManager, async(req, res) => {
    const{portName, portDescription, portStatus} = req.body
    // const updatedAt = Date.now
    // Simple validation
    if (!portName){
        return res.status(400).json({success: false, message: "Port Name is required"})
    }
    try {
        var today = new Date();
        var utc = today.getTime() + 25200000;
        let updatePort = {
            portName: portName,
            portUser: req.userId,
            portDescription: portDescription,
            portStatus: portStatus,
            updatedAt: new Date(utc)
        }
        const portUpdateCondition = {_id: req.params.id}
        updatePort = await Port.findOneAndUpdate(portUpdateCondition, updatePort, {new: true})

        if(!updatePort){
            return res.status(401).json({success: false, message: `Port not found with Port ID =  ${req.params.id}`})
        }
        res.json({success: true, message: `Update Port success with Port ID =  ${req.params.id}`, postMessage: updatePort})
    } catch (error) {
        console.log("FinTEST Ports: " + error.message)
    }
})

// @route Delete api/Ports/delete/:id
// @desc Delete Port
// @Access Private

router.delete("/delete/:id", verifyTokenManager, async(req, res) => {
    try {
        const portDeleteCondition = {_id: req.params.id}
        const deletePort = await Port.findOneAndDelete(portDeleteCondition)
        if(!deletePort){
            return res.status(401).json({success: false, message: `Port not found with Port ID =  ${req.params.id}`})
        }
        res.json({success: true, message: `Delete successful Port: ${req.params.id}`})
    } catch (error) {
        console.log("FinTEST Create Ports: " + error.message)
    }
})
module.exports = router