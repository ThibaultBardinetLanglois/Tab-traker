const pool = require('./config/database').pool
const express = require('express');
const app = express();

const userRoutes = require("./src/routes/UserRoutes")
const songRoutes = require("./src/routes/SongsRoutes")
const bookmarkRoutes = require("./src/routes/BookmarksRoutes")

const dotenv = require("dotenv");
dotenv.config();

const morgan = require('morgan');
app.use(morgan('combined'));

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json())


pool // listening on database connection
.then(connection => {
    connection.query("SELECT 1")
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`listening on port ${process.env.SERVER_PORT}`)
        })
    })
    .catch(err => console.log(err))
})


// routes
app.use("/", userRoutes)
app.use("/user", songRoutes)
app.use("/user", bookmarkRoutes)


