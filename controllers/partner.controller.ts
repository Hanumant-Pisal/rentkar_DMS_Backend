import { Response } from "express";
import { AuthRequest } from "../types/express";
import Order, { OrderStatus } from "../models/order.model";
import User from "../models/user.model";


export const getMyOrders = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const orders = await Order.find({ assignedTo: req.user.id });
  res.status(200).json({ orders });
};


export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  
  if (req.user.role !== 'partner') {
    return res.status(403).json({ error: "Only partners can update order status" });
  }
  
  const { status } = req.body;
  
  
  const order = await Order.findOne({ 
    _id: req.params.id, 
    assignedTo: req.user.id 
  });
  
  if (!order) {
    return res.status(404).json({ error: "Order not found or not assigned to you" });
  }

  
  const validTransitions: Record<OrderStatus, OrderStatus[]> = {
    assigned: ['picked_up', 'delivered'],
    picked_up: ['delivered', 'assigned'],
   
    delivered: ['picked_up', 'assigned'],
    pending: [],
   
    
  };

  
  const validNextStatuses = validTransitions[order.status as OrderStatus] || [];
  
  if (!validNextStatuses.includes(status as OrderStatus)) {
    return res.status(400).json({ 
      error: `Cannot change status from ${order.status} to ${status}. ` +
             `Valid next statuses: ${validNextStatuses.join(', ') || 'none'}`
    });
  }

  
  order.status = status as OrderStatus;
  
  try {
    const updatedOrder = await order.save();
    
   
    if (status === 'delivered') {
      await User.findByIdAndUpdate(req.user.id, { 
        isAvailable: true 
      });
    }
    
    res.status(200).json({ 
      message: "Order status updated successfully", 
      order 
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};


export const updateAvailability = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const { isAvailable } = req.body;
  const partner = await User.findById(req.user.id);
  if (!partner) return res.status(404).json({ error: "User not found" });

  partner.isAvailable = isAvailable;
  await partner.save();
  res.status(200).json({ message: "Availability updated", partner });
};


export const updateLocation = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const { coordinates } = req.body;
  const partner = await User.findById(req.user.id);
  if (!partner) return res.status(404).json({ error: "User not found" });

  partner.location = { type: "Point", coordinates };
  await partner.save();
  res.status(200).json({ message: "Location updated", partner });
};


export const getAllPartners = async (req: AuthRequest, res: Response) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  try {
   
    const partners = await User.find(
      { role: 'partner' },
      { passwordHash: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );
    
    res.status(200).json({ partners });
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
