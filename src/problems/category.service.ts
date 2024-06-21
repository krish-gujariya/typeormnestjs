import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { catchError, returnObjectFunction } from 'src/helper/genralFunction';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepo: Repository<Categories>,
  ) {}

  async viewCategory() {
    try {
      const data = await this.categoryRepo.find();
      if (data.length == 0) {
        return returnObjectFunction(false, 404, `No categories found...`);
      } else {
        return returnObjectFunction(
          true,
          201,
          `Categories retrived successfully...`,
          data,
        );
      }
    } catch (error) {
      console.log(error);

      return catchError(error);
    }
  }
}
