require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRouter = require("./routes/Auth")
const userRouter = require("./routes/User")
const portRouter = require("./routes/Port")
const pageRouter = require("./routes/Page")
const ticketRouter = require("./routes/Ticket")
const typeRouter = require("./routes/Type")


const connectDB = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster-singapore.f6zig.mongodb.net/QRCodeAlpha?retryWrites=true&w=majority`,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log("Connect MongoDB Success!")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/Auth", authRouter)
app.use("/api/Users", userRouter)
app.use("/api/Ports", portRouter)
app.use("/api/Page", pageRouter)
app.use("/api/Tickets", ticketRouter)
app.use("/api/Types", typeRouter)


const PORT = 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
// var u = ""
// console.log("Varible U is "+!u)