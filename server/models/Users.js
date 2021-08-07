const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userEmail:{
        type: String,
        require: true,
        unique: true
    },
    userName:{
        type: String,
        default:"GenZ FinFree"
    },
    userPassword:{
        type: String,
        require: true,
        default: "@si@P@rk"
    },
    userPosition:{
        type: String,
        enum: ["Manager", "Staff"],
        default: "Staff",
    },
    userBirthday:{
        type: Date,
        default: Date.now
    },
    userAddress:{
        type: String,
        default: "Việt Nam"
    },
    userStatus:{
        type: Boolean,
        default: true,
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

module.exports = mongoose.model("Users", UserSchema)