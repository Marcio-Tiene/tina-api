import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1624068865560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          { name: 'hash', type: 'varchar' },
          { name: 'salt', type: 'varchar' },
          { name: 'isActive', type: 'boolean', default: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
