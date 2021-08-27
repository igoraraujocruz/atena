import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRoomRequestsTable1629940117335
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roomRequests',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'room',
            type: 'varchar',
          },
          {
            name: 'message',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'hotel_management_user_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isClean',
            type: 'boolean',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'order_id',
            type: 'uuid',
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
    await queryRunner.createForeignKey(
      'roomRequests',
      new TableForeignKey({
        name: 'OrderRoomRequestsForeignKey',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'roomRequests',
      new TableForeignKey({
        name: 'UserRoomRequestsForeignKey',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'roomRequests',
      'UserRoomRequestsForeignKey',
    );
    await queryRunner.dropForeignKey(
      'roomRequests',
      'OrderRoomRequestsForeignKey',
    );
    await queryRunner.dropTable('roomRequests');
  }
}
