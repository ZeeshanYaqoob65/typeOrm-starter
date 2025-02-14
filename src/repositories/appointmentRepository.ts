import { AppDataSource } from '../data-source';
import { Appointment } from '../entities/Appointment';
import { Dog } from '../entities/Dog';

const appointmentRepository = AppDataSource.getRepository(Appointment);
const dogRepository = AppDataSource.getRepository(Dog);

// Function to calculate hours from time range
const calculateTotalWalkHours = (fromTime: string, toTime: string): number => {
  const from = new Date(`1970-01-01T${fromTime}:00`);
  const to = new Date(`1970-01-01T${toTime}:00`);
  const differenceInMs = to.getTime() - from.getTime();
  return differenceInMs / (1000 * 60 * 60); // Convert milliseconds to hours
};

export const createAppointment = async (
  dogId: number, // Change dog to dogId
  date: string,
  fromTime: string,
  toTime: string
) => {
  const totalWalkHours = calculateTotalWalkHours(fromTime, toTime);

  // Fetch the Dog entity by ID
  const dog = await dogRepository.findOneBy({ id: dogId });
  if (!dog) {
    throw new Error('Dog not found'); // Handle this properly in API response
  }

  const appointment = appointmentRepository.create({
    dog, // Now passing the Dog entity
    date,
    fromTime,
    toTime,
    totalWalkHours,
    appointmentStatus: 'SCHEDULED',
    walkerTotalPayment: 0,
    walkerPaymentStatus: 'PENDING',
    paymentCollected: false,
    reminderEmailSent: false,
    paymentReminderSent: false,
  });

  return await appointmentRepository.save(appointment);
};

export const updateAppointmentStatus = async (id: number, status: string) => {
  // check if status is valid
  // if not throw error
  // else update the status
  // return the updated appointment

  if (
    status !== 'SCHEDULED' &&
    status !== 'COMPLETED' &&
    status !== 'CANCELLED'
  ) {
    throw new Error('Invalid status');
  }
  await appointmentRepository.update(id, { appointmentStatus: status });
  return await appointmentRepository.findOneBy({ id });
};

export const getAppointmentsByDate = async (date: string) => {
  return await appointmentRepository.find({
    where: { date },
  });
};

export const getAppointments = async (
  date?: string,
  walkerId?: number,
  ownerId?: number,
  companyId?: number
) => {
  const query = appointmentRepository
    .createQueryBuilder('appointment')
    .leftJoinAndSelect('appointment.dog', 'dog')
    .leftJoinAndSelect('dog.owner', 'owner')
    .leftJoinAndSelect('dog.walker', 'walker');

  if (date) {
    query.andWhere('appointment.date = :date', { date });
  }
  if (walkerId) {
    query.andWhere('dog.walkerId = :walkerId', { walkerId });
  }
  if (ownerId) {
    query.andWhere('dog.ownerId = :ownerId', { ownerId });
  }
  if (companyId) {
    query.andWhere('owner.companyId = :companyId', { companyId });
  }

  return await query.getMany();
};

export const getAppointmentById = async (id: number) => {
  return await appointmentRepository.findOne({
    where: { id },
    relations: ['dog', 'dog.owner', 'dog.walker'],
  });
};
