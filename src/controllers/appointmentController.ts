import { Request, Response, RequestHandler } from 'express';
import {
  createAppointment,
  updateAppointmentStatus,
  getAppointmentsByDate,
} from '../repositories/appointmentRepository';
import {
  successResponse,
  createdResponse,
  notFoundResponse,
  errorResponse,
} from '../utils/responseHandler';
import { appointmentCreateSchema } from '../validations/appointmentValidation';

const parseId = (id: string): number | null => {
  const parsed = parseInt(id);
  return isNaN(parsed) ? null : parsed;
};

export const createAppointmentHandler: RequestHandler = async (req, res) => {
  try {
    const { dogId, date, fromTime, toTime } = req.body;

    const { error } = appointmentCreateSchema.validate({
      dogId,
      date,
      fromTime,
      toTime,
    });
    if (error) {
      return errorResponse(res, error.details[0].message, 400);
    }

    const appointment = await createAppointment(dogId, date, fromTime, toTime);
    createdResponse(res, appointment);
  } catch (error) {
    errorResponse(res);
  }
};

export const updateAppointmentStatusHandler: RequestHandler = async (
  req,
  res
) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid appointment ID', 400);

    const { status } = req.body;
    if (!['SCHEDULED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return errorResponse(res, 'Invalid appointment status', 400);
    }

    const updatedAppointment = await updateAppointmentStatus(id, status);
    updatedAppointment
      ? successResponse(res, updatedAppointment)
      : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const getAppointmentsByDateHandler: RequestHandler = async (
  req,
  res
) => {
  try {
    const appointments = await getAppointmentsByDate(req.params.date);
    successResponse(res, appointments);
  } catch (error) {
    errorResponse(res);
  }
};
