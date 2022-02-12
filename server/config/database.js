const mysql = require('promise-mysql')
const dotenv = require("dotenv")
dotenv.config()


const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})
.catch(err => { throw err })

module.exports = {
    pool
}