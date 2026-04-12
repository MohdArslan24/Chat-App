const jwt = require("jsonwebtoken");

const createToken = (user) => {
  try {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET);
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const verifyToken = (token) => {
  try {
    if (!token)
      return res.status(401).send({
        message: "Token missing.",
      });

    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createToken,
  verifyToken
};
