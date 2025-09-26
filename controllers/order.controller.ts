import { Response } from "express";
import { AuthRequest } from "../types/express";
import Order, { OrderStatus } from "../models/order.model";
import User from "../models/user.model";


export const createOrder = async (req: AuthRequest, res: Response) => {
  const { customerName, customerPhone, deliveryAddress, deliveryLocation, items } = req.body;

  if (!customerName || !deliveryAddress || !deliveryLocation || !items) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const orderNumber = "ORD-" + Date.now();
  const order = await Order.create({
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


export const getOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find().populate("assignedTo", "name email vehicleNumber");
  res.status(200).json({ orders });
};


export const getOrder = async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id).populate("assignedTo", "name email vehicleNumber");
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.status(200).json({ order });
};


export const updateOrder = async (req: AuthRequest, res: Response) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.status(200).json({ message: "Order updated", order });
};


export const deleteOrder = async (req: AuthRequest, res: Response) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.status(200).json({ message: "Order deleted" });
};


export const assignOrder = async (req: AuthRequest, res: Response) => {
  const { partnerId } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  const partner = await User.findById(partnerId);
  if (!partner || partner.role !== "partner") return res.status(400).json({ error: "Invalid partner" });

  order.assignedTo = partner._id;
  order.status = "assigned";
  await order.save();

  res.status(200).json({ message: "Order assigned", order });
};


// export const unassignOrder = async (req: AuthRequest, res: Response) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) return res.status(404).json({ error: "Order not found" });

//   order.assignedTo = undefined;
//   order.status = "pending";
//   await order.save();

//   res.status(200).json({ message: "Order unassigned", order });
// };
