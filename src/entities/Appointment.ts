import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Dog } from './Dog';
import { DogWalker } from './DogWalker';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Dog, (dog) => dog.id, { nullable: false })
  dog!: Dog;

  @ManyToOne(() => DogWalker, (walker) => walker.id, { nullable: false })
  walker!: DogWalker;

  @Column({ type: 'date' })
  date?: string; // YYYY-MM-DD format

  @Column({ type: 'time' })
  fromTime!: string; // HH:MM:SS format

  @Column({ type: 'time' })
  toTime!: string; // HH:MM:SS format

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  totalWalkHours!: number; // Example: 1.5 for 1 hour 30 minutes

  @Column({
    type: 'enum',
    enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'],
    default: 'SCHEDULED',
  })
  appointmentStatus!: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  walkerTotalPayment?: number;

  @Column({ type: 'enum', enum: ['PENDING', 'PAID'], default: 'PENDING' })
  walkerPaymentStatus?: 'PENDING' | 'PAID';

  @Column({ type: 'boolean', default: false })
  paymentCollected?: boolean;

  @Column({ type: 'boolean', default: false })
  reminderEmailSent?: boolean;

  @Column({ type: 'boolean', default: false })
  paymentReminderSent?: boolean;
  // i want this to go default to current time
  @CreateDateColumn()
  createdAt?: Date;
  // i want this to go default to current time
}
