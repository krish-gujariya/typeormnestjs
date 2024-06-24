import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1719216130070 implements MigrationInterface {
    name = 'NewMigration1719216130070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`testcases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`problem_id\` int NOT NULL, \`input\` varchar(255) NOT NULL, \`output\` varchar(255) NOT NULL, \`visibility\` tinyint NOT NULL, \`problemId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`problems\` ADD \`time_limit\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`problems\` ADD \`memory_limit\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`testcases\` ADD CONSTRAINT \`FK_5ddd91fa9b1c308a8ae01771691\` FOREIGN KEY (\`problemId\`) REFERENCES \`problems\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`testcases\` DROP FOREIGN KEY \`FK_5ddd91fa9b1c308a8ae01771691\``);
        await queryRunner.query(`ALTER TABLE \`problems\` DROP COLUMN \`memory_limit\``);
        await queryRunner.query(`ALTER TABLE \`problems\` DROP COLUMN \`time_limit\``);
        await queryRunner.query(`DROP TABLE \`testcases\``);
    }

}
