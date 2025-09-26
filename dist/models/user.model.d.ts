import { Types } from "mongoose";
export interface IUser {
    name: string;
    email: string;
    passwordHash: string;
    role: "admin" | "partner";
    phone?: string;
    vehicleNumber?: string;
    isAvailable?: boolean;
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
}
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser> & IUser & {
    _id: Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=user.model.d.ts.map