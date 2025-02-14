import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DogOwner } from './DogOwner';
import { DogWalker } from './DogWalker';
import { Appointment } from './Appointment';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => DogOwner, (owner) => owner.dogs, { nullable: false })
  owner?: DogOwner;

  @ManyToOne(() => DogWalker, (walker) => walker.dogs, { nullable: true })
  walker?: DogWalker; // Nullable because a dog might not always be assigned to a walker

  @OneToMany(() => Appointment, (appointment) => appointment.dog) // One dog can have many appointments
  appointments?: Appointment[];
}
