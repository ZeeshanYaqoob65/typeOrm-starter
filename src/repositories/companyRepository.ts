import { AppDataSource } from '../data-source';
import { Company } from '../entities/Company';

const companyRepository = AppDataSource.getRepository(Company);

export const createCompany = async (
  name: string,
  email: string,
  address: string
) => {
  const company = companyRepository.create({ name, email, address });
  return await companyRepository.save(company);
};

export const getCompanies = async () => await companyRepository.find();

export const getCompanyById = async (id: number) =>
  await companyRepository.findOneBy({ id });

export const updateCompany = async (
  id: number,
  name: string,
  email: string,
  address: string
) => {
  await companyRepository.update(id, { name, email, address });
  return await companyRepository.findOneBy({ id });
};

export const deleteCompany = async (id: number) =>
  await companyRepository.delete(id);
