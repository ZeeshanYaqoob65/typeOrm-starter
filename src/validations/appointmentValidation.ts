import Joi from 'joi';

export const appointmentCreateSchema = Joi.object({
  dogId: Joi.number().required(),
  date: Joi.date().required(),
  fromTime: Joi.string().required(),
  toTime: Joi.string().required(),
});
