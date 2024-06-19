
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { InsertResult, DataSource } from 'typeorm';
import { Roles } from 'src/users/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // const roleRepo = dataSource.getRepository(Roles);
    //  roleRepo.save([{roles:"USER"},{roles:"ADMIN"}]);
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(10);
  }
}
 