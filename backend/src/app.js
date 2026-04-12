const express = require("express")
const cookieParser = require("cookie-parser")

const auhtRoute = require('./routes/auth.routes')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Server Running")
})


app.use("/api/auth", auhtRoute)

module.exports = app