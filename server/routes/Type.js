const express = require('express')
const router = express.Router()
const Type = require("../models/Types")
const verifyTokenManager = require("../middleware/Auth_Manager")
const verifyToken = require("../middleware/Auth")

router.post("/create", verifyTokenManager, async(req, res) => {
    const{typeName, typePrice, typePorts, typeStatus} = req.body
    if (!typeName || !typePrice){
        return res.status(400).json({success: false, message: "Type name and Type price are required"})
    }
    try {
        const typeUser = req.userId
        const newType = new Type({
            typeName: typeName,
            typePrice: typePrice,
            typeUser: typeUser,
            typePorts: typePorts,
            typeStatus: typeStatus
        })
        await newType.save()

        res.json({success: true, message: `Successfully created Type`, newType})
    } catch (error) {
        console.log("FinTEST types: " + error.message)
    }
})

router.get("/view", verifyToken, async(req, res) => {
    try {
        const viewTypes = await Type.find().populate("typeUser", [
            "userName",
            "userEmail"
        ]).populate("typePorts", [
            "portName",
            "portDescription",
            "portStatus"
        ])
        res.json({success: true, viewTypes})
    } catch (error) {
        console.log("FinTEST types: " + error.message)
    }
})

router.get("/view/:id", verifyTokenManager, async(req, res) => {
    try {
        const typeViewCondition = {_id: req.params.id}
        const viewTypes = await Type.findOne(typeViewCondition).populate("typePorts", [
            "_id",
            "portName",
            "portDescription",
            "portStatus"
        ])
        res.json({
            typePorts: viewTypes.typePorts,
            typeStatus: viewTypes.typeStatus})
    } catch (error) {
        console.log("FinTEST types: " + error.message)
    }
})

router.delete("/delete/:id", verifyTokenManager, async(req, res) => {
    try {
        const typeViewCondition = {_id: req.params.id}
        const deleteType = await Type.findOneAndDelete(typeViewCondition)
        if(!deleteType){
            return res.status(401).json({success: false, message: `Type not found with Type ID =  ${req.params.id}`})
        }
        res.json({success: true, message: `Delete successful Type: ${req.params.id}`})
    } catch (error) {
        console.log("FinTEST Create Ports: " + error.message)
    }
})

router.put("/update/:id" ,verifyTokenManager, async(req, res) => {
    const{typeName, typePrice, typePorts, typeStatus} = req.body
    if (!typeName || !typePrice){
        return res.status(400).json({success: false, message: "Type name and Type price are required"})
    }
    try {
        const typeUser = req.userId
        var today = new Date();
        var utc = today.getTime() + 25200000;
        let updateType = {
            typeName: typeName,
            typePrice: typePrice,
            typeUser: typeUser,
            typePorts: typePorts,
            typeStatus: typeStatus,
            updatedAt: new Date(utc)
        }
        const typeUpdateCondition = {_id: req.params.id}
        updateType = await Type.findOneAndUpdate(typeUpdateCondition, updateType, {new: true})

        if(!updateType){
            return res.status(401).json({success: false, message: `Type not found with Type ID =  ${req.params.id}`})
        }
        res.json({success: true, message: `Update Type success with Type ID =  ${req.params.id}`, updateType})
    } catch (error) {
        console.log("FinTEST Types: " + error.message)
    }
})
module.exports = router