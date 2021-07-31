// const jwt = require("jsonwebtoken");

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluenhjIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI3MzcwOTYyfQ.Myf3GgjosnkDZQBFV2Q_DbPEsyX2x0z_2KSsOuRf8js"

// jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluenhjIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI3MzcwOTYyfQ.Myf3GgjosnkDZQBFV2Q_DbPEsyX2x0z_2KSsOuRf8js",""+process.env.JWT_TOKEN+"",function(err,decoded) {
//     return console.log(decoded)
// })

console.log(process.env.JWT_TOKEN)