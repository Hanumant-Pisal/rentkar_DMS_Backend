import { Schema, model, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "partner";
  phone?: string;
  vehicleNumber?: string;
  isAvailable?: boolean;
  location?: { type: "Point"; coordinates: [number, number] };
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "partner", enum: ["admin", "partner"], required: true },
  phone: String,
  vehicleNumber: String,
  isAvailable: { type: Boolean, default: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] }
  }
}, { timestamps: true });

export default model<IUser>("User", userSchema);
