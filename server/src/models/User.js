const pool = require("../../config/database").pool

const bcrypt = require('bcrypt')
const saltRounds = 10;

exports.createUser = async (pseudo, email, password) => {
    if(!pseudo?.length > 0 || !email?.length > 0 || !password?.length > 0) return Promise.reject(
        new Error("pseudo or email or password length is empty or undefined")
    )
    return bcrypt.hash(password, saltRounds)
    .then(hash => {
        let query = "INSERT INTO users (pseudo, email, password, role) VALUES (?, ?, ?, 'user')"
        return pool
        .then(connection => connection.query(query, [pseudo, email, hash])) 
        .catch(err => console.log(err))
    })
}

exports.getAllUsers = async () => {
    let query = "SELECT * FROM users"
    return pool
    .then(connection => connection.query(query))
    .catch(err => console.log(err))
}

exports.getUserById = async (id) => {
    let query = "SELECT * FROM users WHERE id = ?";
    return pool
    .then(connection => connection.query(query, [id]))
    .catch(err => console.log(err))
}

exports.getUserByPseudo = async (pseudo) => {
    let query = "SELECT * FROM users WHERE pseudo = ?";
    return pool
    .then(connection => connection.query(query, [pseudo]))
    .catch(err => console.log(err))
}

exports.getUserByEmail = async (email) => {
    let query = "SELECT * FROM users WHERE email = ?";
    return pool
    .then(connection => connection.query(query, [email]))
    .catch(err => console.log(err))
}

exports.getUserByRole = async (role) => {
    let query = "SELECT * FROM users WHERE role = ?";
    return pool
    .then(connection => connection.query(query, [role]))
    .catch(err => console.log(err))
}


