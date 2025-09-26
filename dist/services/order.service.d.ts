export declare const createOrderService: (data: any, adminId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/order.model").IOrder> & import("../models/order.model").IOrder & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const assignOrderService: (orderId: string, partnerId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/order.model").IOrder> & import("../models/order.model").IOrder & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const updateOrderStatusService: (orderId: string, partnerId: string, status: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/order.model").IOrder> & import("../models/order.model").IOrder & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=order.service.d.ts.map