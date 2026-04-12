const express = require("express")

const {signup, login, logout} = require("../controller/auth.controllers")

const router = express.Router()

//Signup Route
router.post("/signup", signup)

//Login Route
router.post("/login", login)

//Logout Route
router.post("/logout", logout)

module.exports = router