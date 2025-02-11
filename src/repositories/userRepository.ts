import { AppDataSource } from '../data-source';
import { Users } from '../entities/User';

const userRepository = AppDataSource.getRepository(Users);

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = userRepository.create({ name, email, password });
  return await userRepository.save(user);
};

export const getUsers = async () => {
  return await userRepository.find();
};

export const getUserById = async (id: number) => {
  return await userRepository.findOneBy({ id });
};

export const updateUser = async (id: number, name: string, email: string) => {
  await userRepository.update(id, { name, email });
  return await userRepository.findOneBy({ id });
};

export const deleteUser = async (id: number) => {
  return await userRepository.delete(id);
};
