const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PortSchema = new Schema({
    portName:{
        type: String,
        require: true,
        unique: true,
    },
    portUser:{
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    portDescription:{
        type: String,
    },
    portStatus:{
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Ports", PortSchema)