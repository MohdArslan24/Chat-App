
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

module.exports = {
    getCurrentUser
}