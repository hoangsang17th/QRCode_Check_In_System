var express = require('express')
var logger = require("morgan")
var app = express()
var db = require('./config/db')
var bodyParser = require('body-parser');
var authRouter = require("./routes/auth")
var userRouter = require("./routes/user")
const cors = require('cors');
const adminMiddleware = require("./middleware/AdminMiddleware")

app.use(cors());


// connect mongodb
db.connect()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// middleware
app.use(logger('dev'))

// routers
app.use('/api',authRouter)

app.use('/api',adminMiddleware,userRouter)



const port = process.env.PORT || 7000;

app.listen(port, () => `Server running on port ${port} 🔥`);