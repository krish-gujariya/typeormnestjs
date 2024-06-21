import { Faker, faker } from "@faker-js/faker";
import { Categories } from "src/problems/entities/categories.entity";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(Categories, (faker:Faker):Categories=>{
    const category = new Categories()
    category.category = faker.music.genre()
    return category
})