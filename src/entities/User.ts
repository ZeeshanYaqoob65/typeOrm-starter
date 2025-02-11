import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true }) // Ensure emails are unique
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;
}
