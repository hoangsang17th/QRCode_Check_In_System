const user = require('../model/user')
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");
const authHelper = require('../helper/auth')
const jwt = require("jsonwebtoken");

const index = (req,res) => {
    return res.status(200).json({
        message: "Login Get"
    })
}

const login = async(req,res) => {
    const username = req.body.username
    const pass = req.body.password
    user.findOne({username : username}).then(info_user => {
        if(info_user) {
            if(bcrypt.compareSync(pass, info_user.password)) {
               if(info_user.remember_token == null) {
                    info_user.remember_token = authHelper.generateAuthToken({username : info_user.username,role : info_user.role})
                    info_user.save()
                    return res.status(200).send({
                        token: info_user.remember_token
                    })
               } else {
                console.log(username)
                    return res.status(200).send({
                        token: info_user.remember_token,
                        message: "Login Success"
                    })
               }
            //    
            } else {
                return res.status(200).send({
                    message: "Mật khẩu không chính xác"
                })
            }
        } else {
            return res.status(200).send({
                message: "Tên tài khoản không tồn tại"
            })
        }
    })

}

const register = async(req,res) => {
    const username = req.body.username
    user.findOne({username : username}).then(hasUser => {
        if(hasUser) {
            return res.status(200).json({
                message: "Tài khoản đã tồn tại"
            })
        } else {
            const new_user = new user({
                username : username,
                password :  bcrypt.hashSync(req.body.password,10),
                role : req.body.role
            })
            new_user.save()
            return res.status(200).json({
                message: "Đăng ký thành công"
            })
        }
    })
}


module.exports = {
    index,
    login,
    register
}