const express = require("express")
const checkForAuthCookie = require('../middlewares/protect')
const {getCurrentUser, getOtherUsers, updateProfileDetails} = require('../controller/user.controllers')

const router = express.Router()

router.get('/current', checkForAuthCookie, getCurrentUser)

router.get('/other-users', checkForAuthCookie, getOtherUsers)

router.patch('/update-profile', checkForAuthCookie, updateProfileDetails)


module.exports = router