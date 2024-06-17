// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/users/user.entity';
import { genPassword } from 'src/helper/genralFunction';
import faker from 'faker';
import { Roles } from 'src/users/role.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');

    const roleRepo = dataSource.getRepository(Roles);
    const users = await createUser();
    await roleRepo.save([
      { roles: 'USER', users: users },
      { roles: 'ADMIN', users: [{name:"Krish", email:'Krish@gmail.com', password: await genPassword('test')}] },
    ]);
  }
}

const createUser = async () => {
  const array = [];
  for (let index = 0; index < 5; index++) {
    const dataObj = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: (await genPassword(`Test${index}`)) as string,
    };
    array.push(dataObj);
  }
  return array;
};
