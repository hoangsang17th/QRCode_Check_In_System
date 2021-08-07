const jwt = require('jsonwebtoken')

const verifyTokenManager = (req, res, next) =>{
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({success: false, message: "Access token not found"})
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        req.userPosition = decoded.userPosition
        req.userEmail = decoded.userEmail
        if(req.userPosition == "Staff"){
            return res.status(401).json({success: false, message: "You cannot perform this action for the reason you are not manager"})
        }
        next()
    } catch (error) {
        console.log("FinTEST Auth: " + error.message)
        return res.status(403).json({success: false, message: "Invalid token"})
    }
} 
module.exports = verifyTokenManager