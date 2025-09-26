"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri)
        throw new Error("MONGO_URI not defined");
    await mongoose_1.default.connect(uri);
    console.log("MongoDB connected");
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map