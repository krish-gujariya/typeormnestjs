import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from './entities/like.entity';
import { Repository } from 'typeorm';
import { catchError, returnObjectFunction } from 'src/helper/genralFunction';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private likeRepo: Repository<Likes>
  ){}
  async create(createLikeDto: CreateLikeDto) {
    try {
      const data =  this.likeRepo.create(createLikeDto);
      await this.likeRepo.save(data);
      return returnObjectFunction(true,201,`Like data inserted successfully...`)

    } catch (error) {
      return catchError(error);
    }
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

 
}
