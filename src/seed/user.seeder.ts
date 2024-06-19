// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { InsertResult, DataSource } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Roles } from 'src/users/role.entity';
export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleRepo = dataSource.getRepository(Roles);
    const data = roleRepo.create([{roles:"USER"},{roles:"ADMIN"}]);
    await roleRepo.insert(data);
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(5);
  }
}
 