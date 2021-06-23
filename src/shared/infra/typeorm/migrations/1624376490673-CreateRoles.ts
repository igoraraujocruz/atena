import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRoles1624376490673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.query(
      `INSERT INTO roles (name) VALUES ('doctor_urgency'), ('doctor_elective'), ('assistant'), ('analyst'), ('administrator')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM roles WHERE name IN ('doctor_urgency'), ('doctor_elective'), ('assistant'), ('analyst'), ('administrator')`,
    );
    await queryRunner.dropTable('roles');
  }
}
