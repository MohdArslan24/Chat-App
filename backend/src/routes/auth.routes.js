const express = require("express")

const {signup, login, logout} = require("../controller/auth.controllers")
const checkForAuthCookie = require("../middlewares/protect")

const router = express.Router()

//Signup Route
router.post("/signup", signup)

//Login Route
router.post("/login", login)

//Logout Route
router.post("/logout", logout)

// Protected Route Example
router.get("/protected", checkForAuthCookie)

module.exports = router