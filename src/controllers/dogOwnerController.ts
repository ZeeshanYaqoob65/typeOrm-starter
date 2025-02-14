import { Request, Response, RequestHandler } from 'express';
import {
  createDogOwner,
  getDogOwners,
  getDogOwnerById,
  updateDogOwner,
  deleteDogOwner,
} from '../repositories/dogOwnerRepository';
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

export const createDogOwnerHandler: RequestHandler = async (req, res) => {
  try {
    const { name, email, companyId } = req.body;
    if (!name || !email || !companyId) {
      return errorResponse(
        res,
        'Name, email, and company ID are required',
        400
      );
    }
    const owner = await createDogOwner(name, email, companyId);
    createdResponse(res, owner);
  } catch (error) {
    errorResponse(res);
  }
};

export const getDogOwnersHandler: RequestHandler = async (_req, res) => {
  try {
    const owners = await getDogOwners();
    successResponse(res, owners);
  } catch (error) {
    errorResponse(res);
  }
};

export const getDogOwnerByIdHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid owner ID', 400);

    const owner = await getDogOwnerById(id);
    owner ? successResponse(res, owner) : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const updateDogOwnerHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid owner ID', 400);

    const { name, email } = req.body;
    if (!name || !email) {
      return errorResponse(res, 'Name and email are required', 400);
    }

    const updatedOwner = await updateDogOwner(id, name, email);
    updatedOwner ? successResponse(res, updatedOwner) : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const deleteDogOwnerHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid owner ID', 400);

    await deleteDogOwner(id);
    successResponse(res, null, 'Dog owner deleted successfully');
  } catch (error) {
    errorResponse(res);
  }
};
