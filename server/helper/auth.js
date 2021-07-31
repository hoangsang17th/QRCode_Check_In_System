const jwt = require("jsonwebtoken");

const generateAuthToken = (data) => {
    return jwt.sign(data,process.env.JWT_TOKEN)
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token,process.env.JWT_TOKEN)
    } catch (error) {
        // invalid signature
        return null
    }
} 

const verifyTokenAdmin = (token) => {

}

console.log(process.env.JWT_TOKEN)

module.exports = {
    verifyToken,
    generateAuthToken,
    verifyTokenAdmin
}