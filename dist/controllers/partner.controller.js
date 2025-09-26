"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPartners = exports.updateLocation = exports.updateAvailability = exports.updateOrderStatus = exports.getMyOrders = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getMyOrders = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const orders = await order_model_1.default.find({ assignedTo: req.user.id });
    res.status(200).json({ orders });
};
exports.getMyOrders = getMyOrders;
const updateOrderStatus = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    if (req.user.role !== 'partner') {
        return res.status(403).json({ error: "Only partners can update order status" });
    }
    const { status } = req.body;
    const order = await order_model_1.default.findOne({
        _id: req.params.id,
        assignedTo: req.user.id
    });
    if (!order) {
        return res.status(404).json({ error: "Order not found or not assigned to you" });
    }
    const validTransitions = {
        assigned: ['picked_up', 'in_transit', 'delivered'],
        picked_up: ['in_transit', 'delivered', 'assigned'],
        in_transit: ['delivered', 'picked_up', 'assigned'],
        delivered: ['in_transit', 'picked_up', 'assigned'],
        pending: [],
        confirmed: [],
        cancelled: []
    };
    const validNextStatuses = validTransitions[order.status] || [];
    if (!validNextStatuses.includes(status)) {
        return res.status(400).json({
            error: `Cannot change status from ${order.status} to ${status}. ` +
                `Valid next statuses: ${validNextStatuses.join(', ') || 'none'}`
        });
    }
    order.status = status;
    try {
        const updatedOrder = await order.save();
        if (status === 'delivered') {
            await user_model_1.default.findByIdAndUpdate(req.user.id, {
                isAvailable: true
            });
        }
        res.status(200).json({
            message: "Order status updated successfully",
            order
        });
    }
    catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: "Failed to update order status" });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const updateAvailability = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { isAvailable } = req.body;
    const partner = await user_model_1.default.findById(req.user.id);
    if (!partner)
        return res.status(404).json({ error: "User not found" });
    partner.isAvailable = isAvailable;
    await partner.save();
    res.status(200).json({ message: "Availability updated", partner });
};
exports.updateAvailability = updateAvailability;
const updateLocation = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { coordinates } = req.body;
    const partner = await user_model_1.default.findById(req.user.id);
    if (!partner)
        return res.status(404).json({ error: "User not found" });
    partner.location = { type: "Point", coordinates };
    await partner.save();
    res.status(200).json({ message: "Location updated", partner });
};
exports.updateLocation = updateLocation;
const getAllPartners = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    try {
        const partners = await user_model_1.default.find({ role: 'partner' }, { passwordHash: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        res.status(200).json({ partners });
    }
    catch (error) {
        console.error('Error fetching partners:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllPartners = getAllPartners;
//# sourceMappingURL=partner.controller.js.map