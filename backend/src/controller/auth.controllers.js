const User = require("../models/user.model");
const { createToken } = require("../services/auth.services");

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    if (!name || !email || !password) {
      return res.status(422).send({
        success: false,
        message: "Fill required fields.",
      });
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists)
      return res.send({
        success: false,
        message: "User with this email already exists.",
      }).status(409);
    if (password < 6)
      return res.status(422).send({
        success: false,
        message: "Password must be atleast 6 characters.",
      });

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = createToken(user);

    return res.status(201).cookie("token", token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: false
    }).send({
      success: true,
      message: "User signup successful",
      username: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).send({
        success: false,
        message: "Fill required fields.",
      });
    }

    const userExists = await User.findOne({
      email,
    });
    console.log(userExists)
    if (!userExists)
      return res.send({
        success: false,
        message: "User not exists.",
      }).status(409);

    const isMatch = await userExists.comparePassword(password);

    if (!isMatch)
      return res.send({
        success: false,
        message: "Invalid email or password",
      }).status(401);

    const token = createToken(userExists);

    return res.status(200).cookie("token", token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: false
    }).send({
      success: true,
      message: "User login successful",
      token: token,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

//Logout Controller
const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(205).send({
            success: true,
            message: "User logout successfully"
        })
    } catch (error) {
        return res.send({
          success: false,
          message: error.message,
    });
    }
}

module.exports = {
  signup,
  login,
  logout,
};
