import { Schema, model, Types } from "mongoose";

export type OrderStatus = "pending" | "confirmed" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled";

export interface IOrder {
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  deliveryAddress: string;
  deliveryLocation: { type: "Point"; coordinates: [number, number] };
  items: { name: string; qty: number; price?: number }[];
  totalAmount: number;
  createdBy: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
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
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

orderSchema.index({ deliveryLocation: "2dsphere" });

export default model<IOrder>("Order", orderSchema);
