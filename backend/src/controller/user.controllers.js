const User = require('../models/user.model')


const getCurrentUser = async (req, res) => {
    try {
        const user = req.user
        return res.send(user);

    } catch (error) {
        return res.send({
        success: false,
        message: error.message,
    });
    }
}

const getOtherUsers = async (req, res) => {
    try {
        const otherUsers = await User.find({
            _id: {$ne: req.user.id}
        })

        if(!otherUsers) {
            return res.send({
                success: false,
                message: 'No user found'
            })
        }

         return res.send({
                success: true,
                message: 'Users found',
                data: otherUsers
            })

    } catch (error) {
        return res.send({
        success: false,
        message: error.message,
    });
    }
}

module.exports = {
    getCurrentUser,
    getOtherUsers
}