import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class exchange1677827318458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'exchange',
      new TableColumn({
        name: 'matched_price',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('exchange', 'matched_price');
  }
}
