"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const registerUser = async (data) => {
    const existing = await user_model_1.default.findOne({ email: data.email });
    if (existing)
        throw new Error("Email already exists");
    const passwordHash = await bcrypt_1.default.hash(data.password, 10);
    const user = await user_model_1.default.create({ ...data, passwordHash });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, config_1.JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.service.js.map