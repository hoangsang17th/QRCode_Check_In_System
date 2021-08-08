const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TicketSchema = new Schema({
    ticketCustomer:{
        type: String,
    },
    ticketType:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Types"
    },
    ticketPrice:{
        type: Number,
        require: true
    },
    ticketUser:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Users"
    },
    ticketStatus:{
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

module.exports = mongoose.model("Tickets", TicketSchema)