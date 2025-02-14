import { AppDataSource } from '../data-source';
import { Dog } from '../entities/Dog';

const dogRepository = AppDataSource.getRepository(Dog);

export const createDog = async (name: string, ownerId: number) => {
  const dog = dogRepository.create({ name, owner: { id: ownerId } });
  return await dogRepository.save(dog);
};

export const getDogs = async () => {
  return await dogRepository.find({ relations: ['owner', 'walker'] });
};

export const getDogById = async (id: number) => {
  return await dogRepository.findOne({
    where: { id },
    relations: ['owner', 'walker'],
  });
};

export const updateDog = async (id: number, name: string) => {
  await dogRepository.update(id, { name });
  return await dogRepository.findOneBy({ id });
};

export const deleteDog = async (id: number) => {
  return await dogRepository.delete(id);
};

export const assignWalkerToDog = async (dogId: number, walkerId: number) => {
  await dogRepository.update(dogId, { walker: { id: walkerId } });
  return await dogRepository.findOne({
    where: { id: dogId },
    relations: ['walker'],
  });
};
