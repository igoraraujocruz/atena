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
      `INSERT INTO roles (name) VALUES ('superintendent'), ('doctor_elective'), ('assistant_elective'), ('analyst_elective'), ('coordinator_elective'), ('manager_elective'), ('doctor_urgency'), ('assistant_urgency'), ('analyst_urgency'), ('coordinator_urgency'), ('manager_urgency'), ('doctor_utip'), ('assistant_utip'), ('analyst_utip'), ('coordinator_utip'), ('manager_utip'), ('doctor_ped'), ('assistant_ped'), ('analyst_ped'), ('coordinator_ped'), ('manager_ped'), ('doctor_cm1'), ('assistant_cm1'), ('analyst_cm1'), ('coordinator_cm1'), ('manager_cm1'), ('doctor_onco'), ('assistant_onco'), ('analyst_onco'), ('coordinator_onco'), ('manager_onco'), ('doctor_uadc'), ('assistant_uadc'), ('analyst_uadc'), ('coordinator_uadc'), ('manager_uadc'), ('doctor_utic'), ('assistant_utic'), ('analyst_utic'), ('coordinator_utic'), ('manager_utic'), ('doctor_unicor'), ('assistant_unicor'), ('analyst_unicor'), ('coordinator_unicor'), ('manager_unicor'), ('doctor_card'), ('assistant_card'), ('analyst_card'), ('coordinator_card'), ('manager_card'), ('doctor_cm2'), ('assistant_cm2'), ('analyst_cm2'), ('coordinator_cm2'), ('manager_cm2'), ('doctor_utig'), ('assistant_utig'), ('analyst_utig'), ('coordinator_utig'), ('manager_utig'), ('doctor_cc'), ('assistant_cc'), ('analyst_cc'), ('coordinator_cc'), ('manager_cc'), ('doctor_cm3'), ('assistant_cm3'), ('analyst_cm3'), ('coordinator_cm3'), ('manager_cm3')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM roles WHERE name IN ('superintendent'), ('doctor_elective'), ('assistant_elective'), ('analyst_elective'), ('coordinator_elective'), ('manager_elective'), ('doctor_urgency'), ('assistant_urgency'), ('analyst_urgency'), ('coordinator_urgency'), ('manager_urgency'), ('doctor_utip'), ('assistant_utip'), ('analyst_utip'), ('coordinator_utip'), ('manager_utip'), ('doctor_ped'), ('assistant_ped'), ('analyst_ped'), ('coordinator_ped'), ('manager_ped'), ('doctor_cm1'), ('assistant_cm1'), ('analyst_cm1'), ('coordinator_cm1'), ('manager_cm1'), ('doctor_onco'), ('assistant_onco'), ('analyst_onco'), ('coordinator_onco'), ('manager_onco'), ('doctor_uadc'), ('assistant_uadc'), ('analyst_uadc'), ('coordinator_uadc'), ('manager_uadc'), ('doctor_utic'), ('assistant_utic'), ('analyst_utic'), ('coordinator_utic'), ('manager_utic'), ('doctor_unicor'), ('assistant_unicor'), ('analyst_unicor'), ('coordinator_unicor'), ('manager_unicor'), ('doctor_card'), ('assistant_card'), ('analyst_card'), ('coordinator_card'), ('manager_card'), ('doctor_cm2'), ('assistant_cm2'), ('analyst_cm2'), ('coordinator_cm2'), ('manager_cm2'), ('doctor_utig'), ('assistant_utig'), ('analyst_utig'), ('coordinator_utig'), ('manager_utig'), ('doctor_cc'), ('assistant_cc'), ('analyst_cc'), ('coordinator_cc'), ('manager_cc'), ('doctor_cm3'), ('assistant_cm3'), ('analyst_cm3'), ('coordinator_cm3'), ('manager_cm3')`,
    );
    await queryRunner.dropTable('roles');
  }
}
