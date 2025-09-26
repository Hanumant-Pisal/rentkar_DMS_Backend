import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface TokenPayload {
  id: string;
  role: string;
}

export const generateToken = (payload: TokenPayload, expiresIn = "1h"): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  
 
  return (jwt.sign as any)(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): TokenPayload => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  
  const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & TokenPayload;
  return {
    id: decoded.id,
    role: decoded.role
  };
};
