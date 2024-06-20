import { Injectable, Logger } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Repository } from 'typeorm';
import { catchError, returnObjectFunction } from 'src/helper/genralFunction';
import { Problem } from './entities/problem.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemRepo: Repository<Problem>,
  ) {}
  async create(createProblemDto: CreateProblemDto) {
    try {
      const data = this.problemRepo.create({
        title: createProblemDto.title,
        description: createProblemDto.description,
        difficulty: createProblemDto.difficulty,
        userLikes: [{ user_id:createProblemDto.user_id , like: 'LIKE' }],
      });
      await this.problemRepo.save(data);
      return returnObjectFunction(true, 201, `Problem created successfully...`);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const data = await this.problemRepo.find({ where: {} });
      if (data.length == 0) {
        return returnObjectFunction(false, 404, `No record found...`);
      } else {
        return returnObjectFunction(
          true,
          201,
          `Problem data retrived successfully..`,
          data,
        );
      }
    } catch (error) {
      return catchError(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} problem`;
  }

  update(id: number, updateProblemDto: UpdateProblemDto) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number) {
    return `This action removes a #${id} problem`;
  }
}
