import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { catchError, returnObjectFunction } from 'src/helper/genralFunction';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepo: Repository<Submission>
  ){}
  async create(createSubmissionDto: CreateSubmissionDto) {
    try {
      const data = this.submissionRepo.create(createSubmissionDto);
      await this.submissionRepo.save(data);
      return returnObjectFunction(true,201, `User submission entered successfully...`)

      
    } catch (error) {
      return catchError(error)
    }
  }

  async findAll() {
    try {
      const data = await  this.submissionRepo.find();
      if(data.length ==0){
        return returnObjectFunction(false,404,`No record found...`);
      }else{
        return returnObjectFunction(true,201,`Submission  data retrvied successfully...`,data);
      }
      
    } catch (error) {
      return catchError(error);
    }  
  }

  findOne(id: number) {
    return `This action returns a #${id} submission`;
  }

  update(id: number, updateSubmissionDto: UpdateSubmissionDto) {
    return `This action updates a #${id} submission`;
  }

  remove(id: number) {
    return `This action removes a #${id} submission`;
  }
}
