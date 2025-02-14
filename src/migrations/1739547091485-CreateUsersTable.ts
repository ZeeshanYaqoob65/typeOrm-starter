import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1739547091485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE "users" (
            "id" SERIAL PRIMARY KEY,
            "email" character varying NOT NULL UNIQUE,
            "name" character varying NOT NULL,
            "password" character varying NOT NULL
          )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
