import { Router } from 'express';
import {
  createCompanyHandler,
  getCompaniesHandler,
  getCompanyByIdHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
} from '../controllers/companyController'; // Adjust the import path as needed
import { companySchema } from '../validations/companyValidation'; // Optional: Add validation
import validate from '../middlewares/validateRequest'; // Optional: Add validation middleware

const router = Router();

// Create a new company
router.post('/', validate(companySchema), createCompanyHandler);

// Get all companies
router.get('/', getCompaniesHandler);

// Get a company by ID
router.get('/:id', getCompanyByIdHandler);

// Update a company by ID
router.put('/:id', validate(companySchema), updateCompanyHandler);

// Delete a company by ID
router.delete('/:id', deleteCompanyHandler);

export default router;
