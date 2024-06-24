import { Faker } from '@faker-js/faker';
import { Difficulty, Problem } from 'src/problems/entities/problem.entity';
import { setSeederFactory } from 'typeorm-extension';
const items = ['Easy', 'Extreme', 'Hard', 'Medium'];
export default setSeederFactory(Problem, (faker: Faker): Problem => {
  const problem = new Problem();
  problem.title = faker.company.name();
  problem.description = faker.lorem.lines(2);
  problem.difficulty = items[
    Math.floor(Math.random() * items.length)
  ] as Difficulty;
  problem.category_id = Math.ceil(Math.random() * 5);
  return problem;
});
