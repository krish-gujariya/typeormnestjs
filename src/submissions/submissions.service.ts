import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import {
  catchError,
  noRecorFound,
  returnObjectFunction,
} from 'src/helper/genralFunction';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { NumberModule } from '@faker-js/faker';
import { Validation } from './submission.validation';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepo: Repository<Submission>,
    private validation: Validation
  ) {}
  async create(createSubmissionDto: CreateSubmissionDto) {
    try {
      const validation = await this.validation.submissionValidation(createSubmissionDto);
      if(validation.success){
        const data = this.submissionRepo.create(createSubmissionDto);
        await this.submissionRepo.save(data);
        return returnObjectFunction(
          true,
          201,
          `Your solution has status: ${createSubmissionDto.status}....`,
        );

      }else{
        return validation;
      }
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const data = await this.submissionRepo.find();
      if (data.length == 0) {
        return returnObjectFunction(false, 404, `No record found...`);
      } else {
        return returnObjectFunction(
          true,
          201,
          `Submission  data retrvied successfully...`,
          data,
        );
      }
    } catch (error) {
      return catchError(error);
    }
  }

  async findUserSubmission(userId: number) {
    try {
      const data = await this.submissionRepo.find({
        where: { user_id: userId },
      });
      if (data.length == 0) {
        return noRecorFound();
      } else {
        return returnObjectFunction(
          true,
          201,
          `Submission of user retrived successfully....`,
          data,
        );
      }
    } catch (error) {
      return catchError(error);
    }
  }

  async findProblemUserSubmission(userId: number, problemId: number) {
    try {
      const data = await this.submissionRepo.find({
        relations: { problem: true },
        where: { user_id: userId, problem_id: problemId },
        select: {
          language: true,
          description: true,
          memory_usage: true,
          runtime: true,
          status: true,
          problem: { title: true, description: true, difficulty: true },
        },
      });
      if (data.length == 0) {
        return noRecorFound();
      } else {
        return returnObjectFunction(
          true,
          201,
          `Submission of user of problem  retrived successfully....`,
          data,
        );
      }
    } catch (error) {
      return catchError(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} submission`;
  }
}
