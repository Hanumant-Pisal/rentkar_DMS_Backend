"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = require("../config");
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const existing = await user_model_1.default.findOne({ email });
    if (existing)
        return res.status(400).json({ error: "Email already exists" });
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    const user = await user_model_1.default.create({ name, email, role, passwordHash });
    res.status(201).json({
        message: "User registered",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isAvailable: user.isAvailable
        }
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: "Email and password required" });
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, config_1.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isAvailable: user.isAvailable
        }
    });
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map