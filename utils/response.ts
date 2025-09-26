import { Response } from "express";

export const successResponse = (res: Response, data: any, message = "Success", status = 200) => {
  return res.status(status).json({ message, data });
};

export const errorResponse = (res: Response, error: string | object, status = 400) => {
  return res.status(status).json({ error });
};
