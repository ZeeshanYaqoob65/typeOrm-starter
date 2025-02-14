import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Company } from './Company';
import { Dog } from './Dog';

@Entity()
export class DogOwner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column()
  address?: string;

  @Column()
  postcode?: string;

  @Column()
  email?: string;

  @Column()
  bankDetails?: string;

  @Column()
  rate?: number; // Specify the rate details here

  @ManyToOne(() => Company, (company) => company.dogOwners)
  company?: Company;

  @OneToMany(() => Dog, (dog) => dog.owner)
  dogs?: Dog[];
}
