import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1719201349277 implements MigrationInterface {
  name = 'NewMigration1719201349277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_02e079fd4de48340160982e75a\` ON \`submissions\` (\`user_id\`, \`problem_id\`, \`createdAt\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_02e079fd4de48340160982e75a\` ON \`submissions\``,
    );
  }
}
