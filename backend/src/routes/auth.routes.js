const express = require("express")

const {signup, login, logout, verifiedUser,deleteAccount} = require("../controller/auth.controllers")
const checkForAuthCookie = require("../middlewares/protect")
 

const router = express.Router()

//Signup Route
router.post("/signup", signup)

//Login Route
router.post("/login", login)

//Logout Route
router.post("/logout", logout)

// Protected Route - Returns current user
router.get("/protected", checkForAuthCookie, verifiedUser)

//Delete Account Route
router.delete("/delete-account", checkForAuthCookie, deleteAccount)

module.exports = router