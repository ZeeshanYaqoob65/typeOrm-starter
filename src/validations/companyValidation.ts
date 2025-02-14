import Joi from 'joi';

export const companySchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should not exceed 100 characters',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  address: Joi.string().min(5).max(200).required().messages({
    'string.empty': 'Address is required',
    'string.min': 'Address should have at least 5 characters',
    'string.max': 'Address should not exceed 200 characters',
  }),
  logo: Joi.string().uri().optional().messages({
    'string.uri': 'Logo must be a valid URL',
  }),
  bankDetails: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
});
