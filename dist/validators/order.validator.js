"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignOrderSchema = exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createOrderSchema = joi_1.default.object({
    customerName: joi_1.default.string().required(),
    customerPhone: joi_1.default.string().optional(),
    deliveryAddress: joi_1.default.string().required(),
    deliveryLocation: joi_1.default.object({
        type: joi_1.default.string().valid("Point").required(),
        coordinates: joi_1.default.array().length(2).items(joi_1.default.number()).required()
    }).required(),
    items: joi_1.default.array().items(joi_1.default.object({
        name: joi_1.default.string().required(),
        qty: joi_1.default.number().required()
    })).required()
});
exports.assignOrderSchema = joi_1.default.object({
    partnerId: joi_1.default.string().required()
});
//# sourceMappingURL=order.validator.js.map