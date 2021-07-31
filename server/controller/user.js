const user = require('../model/user')
const authHelper = require('../helper/auth')
const paginate = require('jw-paginate')
const getInfoUser = (req,res) => {
    const token = req.headers.token
    const decoded = authHelper.verifyToken(token)
    if(decoded != null) {
        const username = decoded.username
        user.findOne({username : username}).then(info_user => {
            return res.status(200).send({
                username : info_user.username,
                role : info_user.role
            })
        })
    }
    else return res.status(200).send({
        message: "Token không hợp lệ"
    })
}

const getAllUser = (req,res) => {
    user.find({},function(err,users) {
        if(!err) {
            // const page = parseInt(req.query.page) || 1
            // const pageSize = 2
            // const pager = paginate(users.length, page, pageSize)
            // const pageOfItems = users.slice(pager.startIndex, pager.endIndex + 1)
            // return res.json({pageOfItems})
            return res.status(200).json(users)
        } else {
            res.status(400).json({err : err})
        }
    })
}

module.exports = {
    getInfoUser,
    getAllUser
}