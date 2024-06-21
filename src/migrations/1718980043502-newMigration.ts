import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1718980043502 implements MigrationInterface {
    name = 'NewMigration1718980043502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`submissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`problem_id\` int NOT NULL, \`language\` varchar(255) NOT NULL, \`runtime\` int NOT NULL, \`memory_usage\` int NOT NULL, \`status\` enum ('Accepted', 'Wrong Answer', 'Memory Limit Exceed', 'Time Limit Exceed', 'Runtime Error', 'Internal Error', 'Compile Error') NOT NULL DEFAULT 'Accepted', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_fca12c4ddd646dea4572c6815a9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_d7613a2172f2115adb054c4c16e\` FOREIGN KEY (\`problem_id\`) REFERENCES \`problems\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_d7613a2172f2115adb054c4c16e\``);
        await queryRunner.query(`ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_fca12c4ddd646dea4572c6815a9\``);
        await queryRunner.query(`DROP TABLE \`submissions\``);
    }

}
