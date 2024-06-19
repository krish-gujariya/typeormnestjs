import { setSeederFactory } from "typeorm-extension";
import { User } from "src/users/user.entity";

export default setSeederFactory(User, (faker)=>{
    const user = new User();
    user.name = faker.person.firstName();
    user.email = faker.internet.email();
    user.password = user.name;
    return user; 
})