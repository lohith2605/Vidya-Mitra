const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "vidya_mitra_secret_key";

// Temporary In-Memory store for offline bypass mode
const inMemoryUsers = [
    {
        username: "admin",
        email: "admin@example.com",
        passwordHash: "" // Hashed on first login attempt or direct comparison
    }
];

// Helper to hash password for in-memory use (mimicking mongoose pre-save)
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Determine if MongoDB is connected (readyState === 1)
        const isDbConnected = mongoose.connection.readyState === 1;

        if (isDbConnected) {
            // Standard Database Mode
            const userExists = await User.findOne({ $or: [{ email }, { username }] });
            if (userExists) {
                return res.status(400).json({ message: "Username or Email already registered" });
            }

            const user = new User({ username, email, password });
            await user.save();
        } else {
            // Temporary In-Memory Mode
            const userExists = inMemoryUsers.some(
                u => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
            );
            if (userExists) {
                return res.status(400).json({ message: "Username or Email already registered in memory" });
            }

            const passwordHash = await hashPassword(password);
            inMemoryUsers.push({ username, email, passwordHash });
            console.log(`[Bypass Mode] Temporarily registered user: ${username}`);
        }

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Determine if MongoDB is connected (readyState === 1)
        const isDbConnected = mongoose.connection.readyState === 1;

        if (isDbConnected) {
            // Standard Database Mode
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
                expiresIn: "7d"
            });

            return res.status(200).json({
                message: "Login successful",
                token,
                user: { id: user._id, username: user.username, email: user.email }
            });
        } else {
            // Temporary In-Memory Mode
            let user = inMemoryUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
            
            let isMatch = false;
            if (user) {
                // Support default "admin" / "password123" bypass
                if (user.username === "admin" && password === "password123") {
                    isMatch = true;
                } else if (user.passwordHash) {
                    isMatch = await bcrypt.compare(password, user.passwordHash);
                }
            }

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials (Bypass Mode)" });
            }

            const token = jwt.sign({ userId: "temp-bypass-id", username: user.username }, JWT_SECRET, {
                expiresIn: "7d"
            });

            console.log(`[Bypass Mode] Authenticated user: ${user.username}`);
            return res.status(200).json({
                message: "Login successful (Bypass Mode)",
                token,
                user: { id: "temp-bypass-id", username: user.username, email: user.email }
            });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
