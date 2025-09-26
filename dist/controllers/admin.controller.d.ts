import { Response } from 'express';
import { AuthRequest } from '../types/express';
export declare const getAllPartners: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deletePartner: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAdminStats: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map