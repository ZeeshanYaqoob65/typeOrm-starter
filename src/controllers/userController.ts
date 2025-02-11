import { Request, Response, RequestHandler } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../repositories/userRepository';
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

export const createUserHandler: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return errorResponse(res, 'Name, email and password are required', 400);
    }
    const user = await createUser(name, email, password);
    createdResponse(res, user);
  } catch (error) {
    errorResponse(res);
  }
};

export const getUsersHandler: RequestHandler = async (_req, res) => {
  try {
    const users = await getUsers();
    successResponse(res, users);
  } catch (error) {
    errorResponse(res);
  }
};

export const getUserByIdHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid user ID', 400);

    const user = await getUserById(id);
    user ? successResponse(res, user) : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const updateUserHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid user ID', 400);

    const { name, email } = req.body;
    if (!name || !email) {
      return errorResponse(res, 'Name and email are required', 400);
    }

    const updatedUser = await updateUser(id, name, email);
    updatedUser ? successResponse(res, updatedUser) : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const deleteUserHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid user ID', 400);

    await deleteUser(id);
    successResponse(res, null, 'User deleted successfully');
  } catch (error) {
    errorResponse(res);
  }
};
