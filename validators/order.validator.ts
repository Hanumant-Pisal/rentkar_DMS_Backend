import Joi from "joi";

export const createOrderSchema = Joi.object({
  customerName: Joi.string().required(),
  customerPhone: Joi.string().optional(),
  deliveryAddress: Joi.string().required(),
  deliveryLocation: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().length(2).items(Joi.number()).required()
  }).required(),
  items: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    qty: Joi.number().required()
  })).required()
});

export const assignOrderSchema = Joi.object({
  partnerId: Joi.string().required()
});
