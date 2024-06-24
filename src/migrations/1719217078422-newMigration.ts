import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1719217078422 implements MigrationInterface {
  name = 'NewMigration1719217078422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`testcases\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`testcases\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`testcases\` ADD \`deletedAt\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`testcases\` DROP COLUMN \`deletedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`testcases\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`testcases\` DROP COLUMN \`createdAt\``,
    );
  }
}
