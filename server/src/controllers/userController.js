const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const serverSecret = process.env.SERVER_SECRET
const userModel = require("../models/User")

exports.register = async (req, res) => {
    const user = await userModel.getUserByEmail(req.body.email)
    if(user.code) return res.status(500).json({message: "Unexpected connection problem, cannot aswer to the request"})
    if(user.length) return res.status(401).json({message: "Email already used!!"})

    const userInfos = {pseudo: req.body.pseudo, email: req.body.email, role: "user"}

    await userModel.createUser(req.body.pseudo, req.body.email, req.body.password)
    .then(response => {
        console.log("USER CREATED SUCCESFULLY!")
        // connect automatically the user registered
        const payload = {pseudo: req.body.pseudo, email: req.body.email, role: "user"}
        const token = jwt.sign(payload, serverSecret, { expiresIn: "45min" })
        res.status(200).json({message: "USER CREATED SUCCESFULLY!", token: token, user: userInfos})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "CONNECTION ERROR"})
    })
}

exports.login = async (req, res) => {
    console.log(req.body)
    const user = await userModel.getUserByEmail(req.body.email)
    console.log(user)
    if(user.code) return res.status(500).json({message: "Unexpected connection problem, cannot aswer to the request"})
    if(!user.length) return res.status(401).json({code: "email"})

    bcrypt.compare(req.body.password, user[0].password)
    .then(same => {
        if(!same) return res.status(401).json({code: "password"})
        const payload = {id: user[0].id, pseudo: user[0].pseudo, email: user[0].email, role: user[0].role}
        const token = jwt.sign(payload, serverSecret, { expiresIn: "20s" })
        const userInfos = {id: user[0].id, pseudo: user[0].pseudo, email: user[0].email, role: user[0].role}
        console.log(userInfos)
        res.status(200).json({ token: token, user: userInfos })
    })
}

exports.checkToken = (req, res) => {
    if(!req.token) return res.status(404).json({message: "Invalid token!"})
    res.status(200).json({decryptedToken: req.token})
}