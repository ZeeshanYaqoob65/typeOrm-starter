import { AppDataSource } from '../data-source';
import { DogOwner } from '../entities/DogOwner';

const dogOwnerRepository = AppDataSource.getRepository(DogOwner);

export const createDogOwner = async (
  name: string,
  email: string,
  companyId: number
) => {
  const owner = dogOwnerRepository.create({
    name,
    email,
    company: { id: companyId },
  });
  return await dogOwnerRepository.save(owner);
};

export const getDogOwners = async () =>
  await dogOwnerRepository.find({ relations: ['company'] });

export const getDogOwnerById = async (id: number) =>
  await dogOwnerRepository.findOne({ where: { id }, relations: ['company'] });

export const updateDogOwner = async (
  id: number,
  name: string,
  email: string
) => {
  await dogOwnerRepository.update(id, { name, email });
  return await dogOwnerRepository.findOne({ where: { id } });
};

export const deleteDogOwner = async (id: number) =>
  await dogOwnerRepository.delete(id);
