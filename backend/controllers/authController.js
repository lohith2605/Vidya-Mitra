const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } =
      req.body;

    const existingUsername = await User.findOne({
      username,
    });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const existingEmail = await User.findOne({
      email,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    if (
      error.name === "MongoServerError" &&
      error.code === 11000
    ) {
      const duplicateField =
        error.keyValue &&
        Object.keys(error.keyValue)[0];
      let message = "Duplicate field value";

      if (duplicateField === "email") {
        message = "Email already exists";
      } else if (duplicateField === "username") {
        message = "Username already exists";
      }

      return res.status(400).json({
        message,
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { username, password } =
      req.body;

    const user =
      await User.findOne({
        username,
      });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message:
          "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const { age, courseClass, selfDetails, fullName } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (age !== undefined) user.age = age;
    if (courseClass !== undefined) user.courseClass = courseClass;
    if (selfDetails !== undefined) user.selfDetails = selfDetails;
    if (fullName !== undefined) user.fullName = fullName;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
