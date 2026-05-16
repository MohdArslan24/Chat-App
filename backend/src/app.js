const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const checkForAuthCookie = require('./middlewares/protect')


const auhtRoute = require('./routes/auth.routes')
const userRoute = require('./routes/user.routes')
const messageRoute = require('./routes/message.routes')

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())



app.get("/", (req, res) => {
    res.send("Server Running")
})


app.use("/api/auth", auhtRoute)
app.use("/api/user", userRoute)
app.use("/api/message", messageRoute)

module.exports = app