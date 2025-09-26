import Joi from "joi";

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid("picked_up","delivered","in_transit").required()
});

export const updateAvailabilitySchema = Joi.object({
  isAvailable: Joi.boolean().required()
});

export const updateLocationSchema = Joi.object({
  coordinates: Joi.array().length(2).items(Joi.number()).required()
});
