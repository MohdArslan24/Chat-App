const User = require("../models/user.model");

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    return res.send(user);
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const getOtherUsers = async (req, res) => {
  try {
    const otherUsers = await User.find({
      _id: { $ne: req.user.id },
    });

    if (!otherUsers) {
      return res.send({
        success: false,
        message: "No user found",
      });
    }

    return res.send({
      success: true,
      message: "Users found",
      data: otherUsers,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

const updateProfileDetails = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = req.user;

    if (email === user.email && name === user.name) {
      return res.send({
        success: true,
        message: "No changes made",
        data: user,
      });
    }

    // Check if email is already in use by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({
         email,
        _id: { $ne: user.id }

         });
      if (existingUser) {
        return res.send({
          success: false,
          message: "Email already in use",
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const updatedUser = await User.findByIdAndUpdate(user.id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    return res.send({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCurrentUser,
  getOtherUsers,
  updateProfileDetails,
};
