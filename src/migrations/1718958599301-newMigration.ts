import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1718958599301 implements MigrationInterface {
    name = 'NewMigration1718958599301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`category\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`problems\` ADD \`category_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`problems\` ADD CONSTRAINT \`FK_6bc91d567d87770fabb03dc4e58\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`problems\` DROP FOREIGN KEY \`FK_6bc91d567d87770fabb03dc4e58\``);
        await queryRunner.query(`ALTER TABLE \`problems\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
