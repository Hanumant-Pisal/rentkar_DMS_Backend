import Order from "../models/order.model";
import User from "../models/user.model";

export const createOrderService = async (data: any, adminId: string) => {
  const orderNumber = "ORD-" + Date.now();
  const order = await Order.create({ ...data, createdBy: adminId, orderNumber });
  return order;
};

export const assignOrderService = async (orderId: string, partnerId: string) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  const partner = await User.findById(partnerId);
  if (!partner || partner.role !== "partner") throw new Error("Invalid partner");

  order.assignedTo = partner._id;
  order.status = "assigned";
  await order.save();
  return order;
};

export const updateOrderStatusService = async (orderId: string, partnerId: string, status: string) => {
  const order = await Order.findOne({ _id: orderId, assignedTo: partnerId });
  if (!order) throw new Error("Order not found");
  order.status = status as any;
  await order.save();
  return order;
};
