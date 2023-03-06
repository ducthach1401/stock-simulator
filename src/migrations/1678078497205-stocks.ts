import { MigrationInterface, QueryRunner } from 'typeorm';

export class stocks1678078497205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE stocks ALTER COLUMN purchase_price DROP NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE stocks ALTER COLUMN purchase_price SET NOT NULL;`,
    );
  }
}
