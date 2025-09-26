export declare const registerUser: (data: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "partner";
}) => Promise<import("mongoose").Document<unknown, {}, import("../models/user.model").IUser> & import("../models/user.model").IUser & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    token: string;
    user: import("mongoose").Document<unknown, {}, import("../models/user.model").IUser> & import("../models/user.model").IUser & {
        _id: import("mongoose").Types.ObjectId;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map