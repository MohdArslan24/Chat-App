const {verifyToken} = require('../services/auth.services')

const checkForAuthCookie = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.send({
                success: false,
                message: "Token not found"
            });
        }
        
        const userPayload = await verifyToken(token);
        req.user = userPayload;
        next();
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
}

module.exports = checkForAuthCookie