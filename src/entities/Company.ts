import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DogOwner } from './DogOwner';
import { DogWalker } from './DogWalker';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  logo?: string;

  @Column()
  bankDetails?: string;

  @Column()
  address?: string;

  @Column()
  email?: string;

  @Column()
  phoneNumber?: string;

  @OneToMany(() => DogOwner, (dogOwner) => dogOwner.company)
  dogOwners?: DogOwner[];

  @OneToMany(() => DogWalker, (dogWalker) => dogWalker.company)
  dogWalkers?: DogWalker[];
}
