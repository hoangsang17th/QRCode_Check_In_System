var express = require('express')
var authRouter = express.Router()
var user = require("../controller/user")

var authController = require('../controller/auth')

authRouter.route('/login')
    .get(authController.index)
    .post(authController.login)

authRouter.route('/register')
    .post(authController.register)

module.exports = authRouter
