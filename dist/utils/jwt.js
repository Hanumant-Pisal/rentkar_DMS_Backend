"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const generateToken = (payload, expiresIn = "1h") => {
    if (!config_1.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET, { expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    if (!config_1.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    return {
        id: decoded.id,
        role: decoded.role
    };
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map