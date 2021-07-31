const jwt = require('jsonwebtoken')
const user = require('../model/user')

const adminMiddleware = async(req, res, next) => {
    const token = req.headers.token
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN)
        if(data.role == "admin") {
            user.findOne({username : data.username}).then(hasUser => {
                if(hasUser) {
                    next()
                } else {
                    return res.status(404).send({ error: 'Người dùng không tồn tại' })
                }
            })
        } else {
            res.status(401).send({ error: 'Bạn không có quyền truy cập' })
        }
    } catch (error) {
        res.status(401).send({ error: 'Token không hợp lệ' })
    }
}
module.exports = adminMiddleware