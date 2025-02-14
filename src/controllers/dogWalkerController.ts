import { Request, Response, RequestHandler } from 'express';
import {
  createDogWalker,
  getDogWalkers,
  getDogWalkerById,
  updateDogWalker,
  deleteDogWalker,
} from '../repositories/dogWalkerRepository';
import {
  successResponse,
  createdResponse,
  notFoundResponse,
  errorResponse,
} from '../utils/responseHandler';

const parseId = (id: string): number | null => {
  const parsed = parseInt(id);
  return isNaN(parsed) ? null : parsed;
};

export const createDogWalkerHandler: RequestHandler = async (req, res) => {
  try {
    const {
      fullName,
      address,
      postcode,
      email,
      bankDetails,
      ratePerHour,
      companyId,
    } = req.body;
    if (
      !fullName ||
      !address ||
      !postcode ||
      !email ||
      !bankDetails ||
      !ratePerHour ||
      !companyId
    ) {
      return errorResponse(res, 'All fields are required', 400);
    }

    const walker = await createDogWalker(
      fullName,
      address,
      postcode,
      email,
      bankDetails,
      ratePerHour,
      companyId
    );
    createdResponse(res, walker);
  } catch (error) {
    errorResponse(res);
  }
};

export const getDogWalkersHandler: RequestHandler = async (_req, res) => {
  try {
    const walkers = await getDogWalkers();
    successResponse(res, walkers);
  } catch (error) {
    errorResponse(res);
  }
};

export const getDogWalkerByIdHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid walker ID', 400);

    const walker = await getDogWalkerById(id);
    walker ? successResponse(res, walker) : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const updateDogWalkerHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid walker ID', 400);

    const { fullName, address } = req.body;
    if (!fullName || !address) {
      return errorResponse(res, 'Full name and address are required', 400);
    }

    const updatedWalker = await updateDogWalker(id, fullName, address);
    updatedWalker ? successResponse(res, updatedWalker) : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const deleteDogWalkerHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid walker ID', 400);

    await deleteDogWalker(id);
    successResponse(res, null, 'Dog walker deleted successfully');
  } catch (error) {
    errorResponse(res);
  }
};
