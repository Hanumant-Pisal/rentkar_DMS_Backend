"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerPhone: String,
    deliveryAddress: { type: String, required: true },
    deliveryLocation: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }
    },
    items: [{
            name: String,
            qty: Number,
            price: { type: Number, default: 0 }
        }],
    totalAmount: { type: Number, required: true, default: 0 },
    status: {
        type: String,
        enum: ["pending", "confirmed", "assigned", "picked_up", "in_transit", "delivered", "cancelled"],
        default: "pending"
    },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
orderSchema.index({ deliveryLocation: "2dsphere" });
exports.default = (0, mongoose_1.model)("Order", orderSchema);
//# sourceMappingURL=order.model.js.map