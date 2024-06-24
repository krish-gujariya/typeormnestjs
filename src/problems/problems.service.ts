import { Injectable, Logger } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Repository } from 'typeorm';
import {
  catchError,
  noRecorFound,
  returnObjectFunction,
} from 'src/helper/genralFunction';
import { Difficulty, Problem } from './entities/problem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemRepo: Repository<Problem>,
  ) {}
  async create(createProblemDto: CreateProblemDto) {
    try {
      const data = this.problemRepo.create(createProblemDto);
      console.log(data);

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

  async findByDifficulty(level: Difficulty) {
    try {
      const data = await this.problemRepo.findBy({ difficulty: level });
      if (data.length == 0) {
        return returnObjectFunction(false, 404, 'No record found...');
      } else {
        return returnObjectFunction(
          true,
          201,
          `Problem of ${level} found successfully...`,
          data,
        );
      }
    } catch (error) {
      return catchError(error);
    }
  }

  async findById(id: number) {
    try {
      console.log('asgvyashdgvkahfvajsd');
      const data = await this.problemRepo.findOneBy({ id });
      if (data) {
        return returnObjectFunction(true, 201, undefined, data);
      } else {
        return noRecorFound();
      }
    } catch (error) {
      return catchError(error);
    }
  }
}
