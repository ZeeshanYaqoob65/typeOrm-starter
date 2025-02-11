import { Response } from 'express';

export const successResponse = (
  res: Response,
  data: any,
  message = 'Success',
  status = 200
): void => {
  res.status(status).json({ success: true, message, data });
};

export const createdResponse = (
  res: Response,
  data: any,
  message = 'Resource created'
): void => {
  res.status(201).json({ success: true, message, data });
};

export const notFoundResponse = (
  res: Response,
  message = 'Resource not found'
): void => {
  res.status(404).json({ success: false, message });
};

export const errorResponse = (
  res: Response,
  message = 'Internal server error',
  status = 500
): void => {
  res.status(status).json({ success: false, message });
};
