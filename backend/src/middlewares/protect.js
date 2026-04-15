const {verifyToken} = require('../services/auth.services')

const checkForAuthCookie = async (req, res, next) => {
    try {
        let token = req.cookies.token
        if(!token){
            console.log(req.cookies);
            
            return res.send({
                success: false,
                message: "Token not found"
            })
            let userPayload = await verifyToken(token)
            console.log(user);
            req.user = userPayload
            return res.send({
                success: true,
                message: "Authorized user"
            })
            next();
            
        } 
    } catch (error) { 
        return res.send({
      success: false,
      message: error.message,
    });
    }
}

module.exports = checkForAuthCookie