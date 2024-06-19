import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { InsertResult, DataSource } from 'typeorm';
import { Problem } from 'src/problems/entities/problem.entity';
export default class ProblemSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const problemFactory = factoryManager.get(Problem);
    await problemFactory.saveMany(20);
  }
}
 

