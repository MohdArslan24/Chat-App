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
      return res
        .send({
          success: false,
          message: "User with this email already exists.",
        })
        .status(409);
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

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: false,
      })
      .send({
        success: true,
        message: "Account created successfully",
        username: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
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
    if (!userExists)
      return res
        .send({
          success: false,
          message: "User not exists.",
        })
        .status(409);

    const isMatch = await userExists.comparePassword(password);

    if (!isMatch)
      return res
        .send({
          success: false,
          message: "Invalid email or password",
        })
        .status(401);

    const token = createToken(userExists);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: false,
      })
      .send({
        success: true,
        message: "User login successful",
        userData: userExists,
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
const verifiedUser = async (req, res) => {
  try {
    return res.send({
      success: true,
      message: "User verified",
      user: req.user,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.send({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;
    if (!currentPassword || !newPassword) {
      return res.status(422).send({
        success: false,
        message: "Fill required fields.",
      });
    }
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch)
      return res
        .send({
          success: false,
          message: "Current password is incorrect",
        })
        .status(401);
    if (newPassword.length < 6)
      return res.status(422).send({
        success: false,
        message: "New password must be atleast 6 characters.",
      });
    user.password = newPassword;
    await user.save();
    return res.send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    res.clearCookie("token");
    return res.send({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verifiedUser,
  deleteAccount,
};
