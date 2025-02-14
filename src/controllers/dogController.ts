import { Request, Response, RequestHandler } from 'express';
import {
  createDog,
  getDogs,
  getDogById,
  updateDog,
  deleteDog,
  assignWalkerToDog,
} from '../repositories/dogRepository';
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

export const createDogHandler: RequestHandler = async (req, res) => {
  try {
    const { name, ownerId } = req.body;
    if (!name || !ownerId) {
      return errorResponse(res, 'Name and owner ID are required', 400);
    }

    const dog = await createDog(name, ownerId);
    createdResponse(res, dog);
  } catch (error) {
    errorResponse(res);
  }
};

export const getDogsHandler: RequestHandler = async (_req, res) => {
  try {
    const dogs = await getDogs();
    successResponse(res, dogs);
  } catch (error) {
    errorResponse(res);
  }
};

export const getDogByIdHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid dog ID', 400);

    const dog = await getDogById(id);
    dog ? successResponse(res, dog) : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const updateDogHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid dog ID', 400);

    const { name } = req.body;
    if (!name) {
      return errorResponse(res, 'Name is required', 400);
    }

    const updatedDog = await updateDog(id, name);
    updatedDog ? successResponse(res, updatedDog) : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const deleteDogHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid dog ID', 400);

    await deleteDog(id);
    successResponse(res, null, 'Dog deleted successfully');
  } catch (error) {
    errorResponse(res);
  }
};

export const assignWalkerToDogHandler: RequestHandler = async (req, res) => {
  try {
    const dogId = parseId(req.params.id);
    const { walkerId } = req.body;

    if (dogId === null || !walkerId) {
      return errorResponse(res, 'Valid dog ID and walker ID are required', 400);
    }

    const updatedDog = await assignWalkerToDog(dogId, walkerId);
    updatedDog
      ? successResponse(res, updatedDog, 'Walker assigned successfully')
      : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};
