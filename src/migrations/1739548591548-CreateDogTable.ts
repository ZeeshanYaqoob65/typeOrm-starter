import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDogTable1739548591548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dog',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'ownerId', type: 'int', isNullable: false },
          { name: 'walkerId', type: 'int', isNullable: true },
        ],
      })
    );

    await queryRunner.createForeignKeys('dog', [
      new TableForeignKey({
        columnNames: ['ownerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dog_owner',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['walkerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dog_walker',
        onDelete: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dog');
  }
}
