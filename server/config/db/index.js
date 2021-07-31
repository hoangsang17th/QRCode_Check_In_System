var mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect(process.env.DB_CONNECT , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("Kết nối thành công")
    } catch (error) {
        console.log("Kết nối thất bại")
    }
}

module.exports = { connect }