import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDogWalker1739548465290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dog_walker',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'fullName', type: 'varchar', isNullable: true },
          { name: 'address', type: 'varchar', isNullable: true },
          { name: 'postcode', type: 'varchar', isNullable: true },
          { name: 'email', type: 'varchar', isNullable: true },
          { name: 'bankDetails', type: 'varchar', isNullable: true },
          { name: 'ratePerHour', type: 'float', isNullable: true },
          { name: 'companyId', type: 'int', isNullable: true },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'dog_walker',
      new TableForeignKey({
        columnNames: ['companyId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'company',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dog_walker');
  }
}
