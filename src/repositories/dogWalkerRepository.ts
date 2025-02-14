import { AppDataSource } from '../data-source';
import { DogWalker } from '../entities/DogWalker';

const dogWalkerRepository = AppDataSource.getRepository(DogWalker);

export const createDogWalker = async (
  fullName: string,
  address: string,
  postcode: string,
  email: string,
  bankDetails: string,
  ratePerHour: number,
  companyId: number
) => {
  const walker = dogWalkerRepository.create({
    fullName,
    address,
    postcode,
    email,
    bankDetails,
    ratePerHour,
    company: { id: companyId },
  });
  return await dogWalkerRepository.save(walker);
};

export const getDogWalkers = async () => {
  return await dogWalkerRepository.find({ relations: ['company', 'dogs'] });
};

export const getDogWalkerById = async (id: number) => {
  return await dogWalkerRepository.findOne({
    where: { id },
    relations: ['company', 'dogs'],
  });
};

export const updateDogWalker = async (
  id: number,
  fullName: string,
  address: string
) => {
  await dogWalkerRepository.update(id, { fullName, address });
  return await dogWalkerRepository.findOneBy({ id });
};

export const deleteDogWalker = async (id: number) => {
  return await dogWalkerRepository.delete(id);
};
