import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1718943531137 implements MigrationInterface {
  name = 'NewMigration1718943531137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`routes\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role_permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_id\` int NOT NULL, \`permission_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`roles\` enum ('ADMIN', 'USER') NOT NULL, UNIQUE INDEX \`IDX_bd81bee7eb74740b8261e3e89f\` (\`roles\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`likes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`entity_type\` varchar(255) NOT NULL, \`entity_id\` int NOT NULL, \`like\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_5101d529ce7756fa20ef687b65\` (\`user_id\`, \`entity_id\`, \`entity_type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`discussions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`entity_id\` int NOT NULL, \`entity_type\` enum ('Discussion', 'Problems') NOT NULL, \`content\` varchar(255) NOT NULL, \`likes\` int NOT NULL DEFAULT '0', \`dislike\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_d54905a08e4a7a18ae0dc776fa\` (\`user_id\`, \`entity_id\`, \`entity_type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`problems\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`difficulty\` enum ('Easy', 'Medium', 'Hard', 'Extreme') NOT NULL DEFAULT 'Easy', \`acceptance_rate\` int NOT NULL DEFAULT '0', \`likes\` int NOT NULL DEFAULT '0', \`dislikes\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`gender\` enum ('Male', 'Female') NULL, \`city\` varchar(255) NULL, \`country\` varchar(255) NULL, \`birthdate\` datetime NULL, \`summary\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`role_id\` int NOT NULL DEFAULT '1', \`password\` varchar(255) NOT NULL, \`profileImg\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_178199805b901ccd220ab7740ec\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_17022daf3f885f7d35423e9971e\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_3f519ed95f775c781a254089171\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discussions\` ADD CONSTRAINT \`FK_6bae1005971de66491e2f46037b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`userAcceptedProblems\` DROP FOREIGN KEY \`FK_cf25403215a70be2fcb9501466d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`userAcceptedProblems\` DROP FOREIGN KEY \`FK_8f91b1d2d788aac56e2b3f2b6ed\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`discussions\` DROP FOREIGN KEY \`FK_6bae1005971de66491e2f46037b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_3f519ed95f775c781a254089171\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_17022daf3f885f7d35423e9971e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_178199805b901ccd220ab7740ec\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_4375103fb077ac488127a288de\` ON \`userAcceptedProblems\``,
    );
    await queryRunner.query(`DROP TABLE \`userAcceptedProblems\``);
    await queryRunner.query(`DROP TABLE \`problems\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_d54905a08e4a7a18ae0dc776fa\` ON \`discussions\``,
    );
    await queryRunner.query(`DROP TABLE \`discussions\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5101d529ce7756fa20ef687b65\` ON \`likes\``,
    );
    await queryRunner.query(`DROP TABLE \`likes\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_bd81bee7eb74740b8261e3e89f\` ON \`roles\``,
    );
    await queryRunner.query(`DROP TABLE \`roles\``);
    await queryRunner.query(`DROP TABLE \`role_permissions\``);
    await queryRunner.query(`DROP TABLE \`permissions\``);
  }
}
