"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusService = exports.assignOrderService = exports.createOrderService = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const createOrderService = async (data, adminId) => {
    const orderNumber = "ORD-" + Date.now();
    const order = await order_model_1.default.create({ ...data, createdBy: adminId, orderNumber });
    return order;
};
exports.createOrderService = createOrderService;
const assignOrderService = async (orderId, partnerId) => {
    const order = await order_model_1.default.findById(orderId);
    if (!order)
        throw new Error("Order not found");
    const partner = await user_model_1.default.findById(partnerId);
    if (!partner || partner.role !== "partner")
        throw new Error("Invalid partner");
    order.assignedTo = partner._id;
    order.status = "assigned";
    await order.save();
    return order;
};
exports.assignOrderService = assignOrderService;
const updateOrderStatusService = async (orderId, partnerId, status) => {
    const order = await order_model_1.default.findOne({ _id: orderId, assignedTo: partnerId });
    if (!order)
        throw new Error("Order not found");
    order.status = status;
    await order.save();
    return order;
};
exports.updateOrderStatusService = updateOrderStatusService;
//# sourceMappingURL=order.service.js.map