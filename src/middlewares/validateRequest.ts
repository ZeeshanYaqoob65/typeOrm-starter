import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { errorResponse } from '../utils/responseHandler';

const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return errorResponse(res, errors.join(', '), 400);
    }

    next(); // Move to the next middleware/controller
  };
};

export default validate;
