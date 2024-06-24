import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1719218082053 implements MigrationInterface {
    name = 'NewMigration1719218082053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`testcases\` CHANGE \`visibility\` \`visibility\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`testcases\` CHANGE \`visibility\` \`visibility\` tinyint NOT NULL`);
    }

}
