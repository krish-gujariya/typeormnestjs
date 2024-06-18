import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, FindUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { catchError } from 'rxjs';
import { returnObjectFunction } from 'src/helper/genralFunction';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}
  create(createUserDto: CreateUserDto) {
    const data = this.userRepository.create(createUserDto);
    return this.userRepository.insert(data);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findUserByEmail(userData:FindUser) {
    try {
      const data = await this.userRepository.findOne({where:{email:userData.email}});
      if(data.email){
        return returnObjectFunction(true,201,`User finded..`)
      }else{
        return returnObjectFunction(false,404,`User doesn't Exists...`)
      }

      
    } catch (error) {
      return catchError(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
