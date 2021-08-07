const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TypeSchema = new Schema({
    typeName:{
        type: String,
        require: true,
        unique: true,
    },
    typePrice:{
        type: Number,
        require: true,
    },
    typeUser:{
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    typePort:[{
        type: Schema.Types.ObjectId,
        ref: "Ports"
    }],
    typeStatus:{
        type: Boolean,
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

module.exports = mongoose.model("Types", TypeSchema)