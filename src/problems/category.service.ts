import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { ILike, Repository } from 'typeorm';
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

  async createCategory(data:string[]){
    try {
      const category = data.map((item)=> ({category:item}))
      
    const result = this.categoryRepo.create(category)
    console.log(result);
    
    // await this.categoryRepo.save(result)
    
    return returnObjectFunction(true,201,`Categories data inserted successfully....`)
      
    } catch (error) {
      return catchError(error);
    }

  }

  async findProblemByCategory(category:string){
    try {
      
      const data = await this.categoryRepo.find({relations:{problems:true,},where:{category:ILike(`${category}%`)}, select:{problems:{title:true, description:true, difficulty:true}}})
      if(data.length==0){
        return returnObjectFunction(false,404,`No question found....`);
      }else{
        return returnObjectFunction(true,201,`Record retrived successfully...`, data)
      }
    } catch (error) {
      return catchError(error)
    }

  }
}


