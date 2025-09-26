interface TokenPayload {
    id: string;
    role: string;
}
export declare const generateToken: (payload: TokenPayload, expiresIn?: string) => string;
export declare const verifyToken: (token: string) => TokenPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map