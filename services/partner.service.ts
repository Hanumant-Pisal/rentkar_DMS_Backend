import User from "../models/user.model";

export const toggleAvailability = async (partnerId: string, isAvailable: boolean) => {
  const partner = await User.findById(partnerId);
  if (!partner) throw new Error("Partner not found");
  partner.isAvailable = isAvailable;
  await partner.save();
  return partner;
};

export const updateLocation = async (partnerId: string, coordinates: [number, number]) => {
  const partner = await User.findById(partnerId);
  if (!partner) throw new Error("Partner not found");
  partner.location = { type: "Point", coordinates };
  await partner.save();
  return partner;
};
