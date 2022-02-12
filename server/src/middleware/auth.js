const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
const secret = process.env.SERVER_SECRET

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log('AUTHORIZATION =>', token)
        jwt.verify(token, secret, (err, decoded) => {
            console.log(err)
            if(err) return res.status(404).json({message: "Wrong token! You're not allowed to access this page."})
            req.token = decoded
            
            next()
        })
    } catch (err) {
        res.status(401).json({ error: err | 'Not authenticated request !'})
    }
};

module.exports = auth
