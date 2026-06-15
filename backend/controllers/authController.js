const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.registerUser = async (req, res) => {
  try {
    console.log('[Backend] Received request:', req.method, req.path);
    console.log('[Backend] Headers:', req.headers && req.headers['content-type']);
    console.log('[Backend] Body payload:', req.body);
    const {
      username,
      email,
      password,
    } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log('[Backend] Created user id:', user._id);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    console.log('[Backend] JWT_SECRET present:', !!process.env.JWT_SECRET, 'length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'JWT secret is not configured on the server',
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Protected Route
exports.getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};