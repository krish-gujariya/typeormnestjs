import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1719202231257 implements MigrationInterface {
  name = 'NewMigration1719202231257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`submissions\` ADD \`description\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`submissions\` DROP COLUMN \`description\``,
    );
  }
}
