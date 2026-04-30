const express = require("express")
const checkForAuthCookie = require('../middlewares/protect')
const {getCurrentUser, getOtherUsers} = require('../controller/user.controllers')

const router = express.Router()

router.get('/current', checkForAuthCookie, getCurrentUser)

router.get('/other-users', checkForAuthCookie, getOtherUsers)

module.exports = router