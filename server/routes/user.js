var express = require('express')
var userRouter = express.Router()


var userController = require('../controller/user')


// infor user
userRouter.route('/info')
    .get(userController.getInfoUser)

// get all user
userRouter.route('/all_user')
    .get(userController.getAllUser)

module.exports = userRouter
