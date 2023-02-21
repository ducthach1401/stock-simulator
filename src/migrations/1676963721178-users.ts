import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class users1676963721178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'balance',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'profit',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'capital',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'is_admin',
        type: 'boolean',
        isNullable: true,
      }),
    ]);

    await queryRunner.query(
      `UPDATE users SET balance=20000000, profit=0, capital=20000000, is_admin=false WHERE balance IS NULL;`,
    );

    await queryRunner.query(
      `UPDATE users SET is_admin=false WHERE is_admin IS NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      'capital',
      'balance',
      'profit',
      'is_admin',
    ]);
  }
}
