const express = require("express")
const checkForAuthCookie = require('../middlewares/protect')
const {getCurrentUser} = require('../controller/user.controllers')

const router = express.Router()

router.get('/current', checkForAuthCookie, getCurrentUser)

module.exports = router