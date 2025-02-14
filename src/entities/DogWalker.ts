import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Company } from './Company';
import { Dog } from './Dog';
import { Appointment } from './Appointment';

@Entity()
export class DogWalker {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName?: string;

  @Column()
  address?: string;

  @Column()
  postcode?: string;

  @Column()
  email?: string;

  @Column()
  bankDetails?: string;

  @Column()
  ratePerHour?: number;

  @ManyToOne(() => Company, (company) => company.dogWalkers)
  company?: Company;

  @OneToMany(() => Dog, (dog) => dog.walker)
  dogs?: Dog[];

  @OneToMany(() => Appointment, (appointment) => appointment.walker) // One walker can have many appointments
  appointments?: Appointment[];
}
