import { MigrationInterface, QueryRunner, Table, ColumnType } from 'typeorm';

export class Users1696239586059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id        uuid          PRIMARY KEY,
        login     varchar(70)   UNIQUE NOT NULL,
        password  varchar(255)  NOT NULL,
        email     varchar(255)  NOT NULL,
        status    varchar(255)  NOT NULL,
        role      varchar(255)  NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE users;
    `);
  }
}
