const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TicketSchema = new Schema({
    ticketCustomer:{
        type: String,
        require: true,
    },
    ticketType:{
        type: Schema.Types.ObjectId,
        ref: "Types"
    },
    ticketUser:{
        type: Schema.Types.ObjectId,
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