import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { InsertResult, DataSource } from 'typeorm';
import { Problem } from 'src/problems/entities/problem.entity';
import { Categories } from 'src/problems/entities/categories.entity';
export default class ProblemSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categoryFactory = factoryManager.get(Categories);
    await categoryFactory.saveMany(5);
    const problemFactory = factoryManager.get(Problem);
    await problemFactory.saveMany(20);
  }
}
