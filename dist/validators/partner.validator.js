"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocationSchema = exports.updateAvailabilitySchema = exports.updateStatusSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateStatusSchema = joi_1.default.object({
    status: joi_1.default.string().valid("picked_up", "delivered", "in_transit").required()
});
exports.updateAvailabilitySchema = joi_1.default.object({
    isAvailable: joi_1.default.boolean().required()
});
exports.updateLocationSchema = joi_1.default.object({
    coordinates: joi_1.default.array().length(2).items(joi_1.default.number()).required()
});
//# sourceMappingURL=partner.validator.js.map