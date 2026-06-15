const express = require("express")
const upload = require('../middlewares/upload')
const checkForAuthCookie = require('../middlewares/protect')
const {getCurrentUser, getOtherUsers, updateProfileDetails, updateProfilePicture} = require('../controller/user.controllers')

const router = express.Router()

router.get('/current', checkForAuthCookie, getCurrentUser)

router.get('/other-users', checkForAuthCookie, getOtherUsers)

router.patch('/update-profile', checkForAuthCookie, updateProfileDetails)

router.patch('/update-profile-picture', checkForAuthCookie, upload.single("profilePicture"), updateProfilePicture)

module.exports = router