import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const registerUser = async (data: { name: string, email: string, password: string, role: "admin" | "partner" }) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("Email already exists");

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, passwordHash });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  return { token, user };
};
