const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, maxLength : 16, minLength: 8},
    password: { type : String},
    role: { type : String},
    remember_token: {type : String},
    createdAt: { type : Date, default : Date.now},
    updatedAt: { type : Date, default : Date.now}
})




module.exports = mongoose.model("users",userSchema)