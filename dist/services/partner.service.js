"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocation = exports.toggleAvailability = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const toggleAvailability = async (partnerId, isAvailable) => {
    const partner = await user_model_1.default.findById(partnerId);
    if (!partner)
        throw new Error("Partner not found");
    partner.isAvailable = isAvailable;
    await partner.save();
    return partner;
};
exports.toggleAvailability = toggleAvailability;
const updateLocation = async (partnerId, coordinates) => {
    const partner = await user_model_1.default.findById(partnerId);
    if (!partner)
        throw new Error("Partner not found");
    partner.location = { type: "Point", coordinates };
    await partner.save();
    return partner;
};
exports.updateLocation = updateLocation;
//# sourceMappingURL=partner.service.js.map