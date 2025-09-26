import { Types } from "mongoose";
export type OrderStatus = "pending" | "confirmed" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled";
export interface IOrder {
    orderNumber: string;
    customerName: string;
    customerPhone?: string;
    deliveryAddress: string;
    deliveryLocation: {
        type: "Point";
        coordinates: [number, number];
    };
    items: {
        name: string;
        qty: number;
        price?: number;
    }[];
    totalAmount: number;
    createdBy: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: import("mongoose").Model<IOrder, {}, {}, {}, import("mongoose").Document<unknown, {}, IOrder> & IOrder & {
    _id: Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=order.model.d.ts.map