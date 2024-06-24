import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1719217847527 implements MigrationInterface {
  name = 'NewMigration1719217847527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`testcases\` DROP FOREIGN KEY \`FK_5ddd91fa9b1c308a8ae01771691\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`testcases\` DROP COLUMN \`problemId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`testcases\` ADD CONSTRAINT \`FK_0261feefe07a8ae77ea9a2b219b\` FOREIGN KEY (\`problem_id\`) REFERENCES \`problems\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`testcases\` DROP FOREIGN KEY \`FK_0261feefe07a8ae77ea9a2b219b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`testcases\` ADD \`problemId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`testcases\` ADD CONSTRAINT \`FK_5ddd91fa9b1c308a8ae01771691\` FOREIGN KEY (\`problemId\`) REFERENCES \`problems\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
