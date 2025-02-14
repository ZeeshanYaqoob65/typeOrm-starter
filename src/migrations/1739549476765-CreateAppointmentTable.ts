import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAppointmentTable1739549476765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the appointment table
    await queryRunner.createTable(
      new Table({
        name: 'appointment',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'dogId', type: 'int', isNullable: false },
          { name: 'walkerId', type: 'int', isNullable: false },
          { name: 'date', type: 'date', isNullable: false },
          { name: 'fromTime', type: 'time', isNullable: false },
          { name: 'toTime', type: 'time', isNullable: false },
          {
            name: 'totalWalkHours',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'appointmentStatus',
            type: 'enum',
            enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'],
            default: `'SCHEDULED'`,
          },
          {
            name: 'walkerTotalPayment',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'walkerPaymentStatus',
            type: 'enum',
            enum: ['PENDING', 'PAID'],
            default: `'PENDING'`,
          },
          { name: 'paymentCollected', type: 'boolean', default: false },
          { name: 'reminderEmailSent', type: 'boolean', default: false },
          { name: 'paymentReminderSent', type: 'boolean', default: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      })
    );

    // Create foreign keys for dogId and walkerId
    await queryRunner.createForeignKeys('appointment', [
      new TableForeignKey({
        columnNames: ['dogId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dog',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['walkerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dog_walker',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the appointment table
    await queryRunner.dropTable('appointment');
  }
}
