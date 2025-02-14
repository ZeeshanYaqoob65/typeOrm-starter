import { Request, Response, RequestHandler } from 'express';
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from '../repositories/companyRepository';
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

export const createCompanyHandler: RequestHandler = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    if (!name || !email || !address) {
      return errorResponse(res, 'Name, email, and address are required', 400);
    }
    const company = await createCompany(name, email, address);
    createdResponse(res, company);
  } catch (error) {
    errorResponse(res);
  }
};

export const getCompaniesHandler: RequestHandler = async (_req, res) => {
  try {
    const companies = await getCompanies();
    successResponse(res, companies);
  } catch (error) {
    errorResponse(res);
  }
};

export const getCompanyByIdHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid company ID', 400);

    const company = await getCompanyById(id);
    company ? successResponse(res, company) : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const updateCompanyHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid company ID', 400);

    const { name, email, address } = req.body;
    if (!name || !email || !address) {
      return errorResponse(res, 'Name, email, and address are required', 400);
    }

    const updatedCompany = await updateCompany(id, name, email, address);
    updatedCompany
      ? successResponse(res, updatedCompany)
      : notFoundResponse(res);
  } catch (error) {
    errorResponse(res);
  }
};

export const deleteCompanyHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return errorResponse(res, 'Invalid company ID', 400);

    await deleteCompany(id);
    successResponse(res, null, 'Company deleted successfully');
  } catch (error) {
    errorResponse(res);
  }
};
