const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PageSchema = new Schema({
    pageStatus:{
        type: Boolean,
        require: true,
        unique: true,
        default: true
    },
    pageUser:{
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Pages", PageSchema)