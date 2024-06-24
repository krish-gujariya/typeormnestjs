import { catchError, noRecorFound, returnObjectFunction } from 'src/helper/genralFunction';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { ProblemsService } from 'src/problems/problems.service';
import { Problem } from 'src/problems/entities/problem.entity';
import { SubmissionStatus } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class Validation {
  constructor(
    @InjectRepository(Problem)
   private problemRepo : Repository<Problem>
  ) {}

  submissionValidation = async (createfield: CreateSubmissionDto) => {
    const { memlimexid, timelimexcid, accepted } = SubmissionStatus;
    try {
      const problemData = await this.problemRepo.findOneBy({id:createfield.problem_id})
      if (problemData) {

        if (createfield.memory_usage >= problemData.memory_limit) {
          createfield.status = memlimexid;
        } else if (createfield.runtime >= problemData.time_limit) {
          createfield.status = timelimexcid;
        } else {
          createfield.status = accepted;
        }

        return returnObjectFunction(true, 201, `Validation successfull...`);
      } else {
        return noRecorFound()
      }
    } catch (error) {
      console.log(error);
      return catchError(error);
    }
  };
}
