import { Response } from "express";
export declare const successResponse: (res: Response, data: any, message?: string, status?: number) => Response<any, Record<string, any>>;
export declare const errorResponse: (res: Response, error: string | object, status?: number) => Response<any, Record<string, any>>;
//# sourceMappingURL=response.d.ts.map