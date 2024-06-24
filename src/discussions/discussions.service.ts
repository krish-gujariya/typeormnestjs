import { Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { Repository } from 'typeorm';
import { Discussion } from './entities/discussion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, returnObjectFunction } from 'src/helper/genralFunction';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectRepository(Discussion)
    private discussRepo: Repository<Discussion>,
  ) {}
  async create(createDiscussionDto: CreateDiscussionDto) {
    try {
      const data = this.discussRepo.create(createDiscussionDto);
      await this.discussRepo.save(data);
      return returnObjectFunction(true, 201, 'Comment added successfully...');
    } catch (error) {
      return catchError(error);
    }
  }

  findAll() {
    return `This action returns all discussions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discussion`;
  }

  update(id: number, updateDiscussionDto: UpdateDiscussionDto) {
    return `This action updates a #${id} discussion`;
  }

  remove(id: number) {
    return `This action removes a #${id} discussion`;
  }
}
