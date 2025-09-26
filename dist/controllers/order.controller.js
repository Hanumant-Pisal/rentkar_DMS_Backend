"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignOrder = exports.deleteOrder = exports.updateOrder = exports.getOrder = exports.getOrders = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const createOrder = async (req, res) => {
    const { customerName, customerPhone, deliveryAddress, deliveryLocation, items } = req.body;
    if (!customerName || !deliveryAddress || !deliveryLocation || !items) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const orderNumber = "ORD-" + Date.now();
    const order = await order_model_1.default.create({
        orderNumber,
        customerName,
        customerPhone,
        deliveryAddress,
        deliveryLocation,
        items,
        createdBy: req.user.id
    });
    res.status(201).json({ message: "Order created", order });
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    const orders = await order_model_1.default.find().populate("assignedTo", "name email vehicleNumber");
    res.status(200).json({ orders });
};
exports.getOrders = getOrders;
const getOrder = async (req, res) => {
    const order = await order_model_1.default.findById(req.params.id).populate("assignedTo", "name email vehicleNumber");
    if (!order)
        return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ order });
};
exports.getOrder = getOrder;
const updateOrder = async (req, res) => {
    const order = await order_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order)
        return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: "Order updated", order });
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    const order = await order_model_1.default.findByIdAndDelete(req.params.id);
    if (!order)
        return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: "Order deleted" });
};
exports.deleteOrder = deleteOrder;
const assignOrder = async (req, res) => {
    const { partnerId } = req.body;
    const order = await order_model_1.default.findById(req.params.id);
    if (!order)
        return res.status(404).json({ error: "Order not found" });
    const partner = await user_model_1.default.findById(partnerId);
    if (!partner || partner.role !== "partner")
        return res.status(400).json({ error: "Invalid partner" });
    order.assignedTo = partner._id;
    order.status = "assigned";
    await order.save();
    res.status(200).json({ message: "Order assigned", order });
};
exports.assignOrder = assignOrder;
// export const unassignOrder = async (req: AuthRequest, res: Response) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) return res.status(404).json({ error: "Order not found" });
//   order.assignedTo = undefined;
//   order.status = "pending";
//   await order.save();
//   res.status(200).json({ message: "Order unassigned", order });
// };
//# sourceMappingURL=order.controller.js.map