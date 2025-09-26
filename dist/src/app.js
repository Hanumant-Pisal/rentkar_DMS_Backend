"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
const routes_1 = __importDefault(require("../routes"));
const error_middleware_1 = require("../middlewares/error.middleware");
const app = (0, express_1.default)();
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3003',
    'https://rentkar-dms-frontend-atrl.vercel.app',
    'https://rentkar-dms-frontend-pxzy.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        // In development, allow all origins for easier testing
        if (process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }
        // In production, only allow specified origins
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log('CORS blocked for origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    optionsSuccessStatus: 204
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1", routes_1.default);
app.get("/api/health", (req, res) => res.send("backend is running"));
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map