"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLog = exports.log = void 0;
const log = (message) => {
    console.log(`[${new Date().toISOString()}] ${message}`);
};
exports.log = log;
const errorLog = (message) => {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
};
exports.errorLog = errorLog;
//# sourceMappingURL=logger.js.map