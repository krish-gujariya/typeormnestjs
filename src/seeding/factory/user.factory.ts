import { User } from 'src/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.person.firstName();
  user.email = faker.internet.email();
  user.password = user.name;
  return user;
});
