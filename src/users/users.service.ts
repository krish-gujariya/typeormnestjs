import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, FindUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { catchError, returnObjectFunction } from 'src/helper/genralFunction';
import { verify } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const data = this.userRepository.create(createUserDto);
    return this.userRepository.insert(data);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findUserByEmail(userData: FindUser) {
    try {
      const data = await this.userRepository.findOne({
        where: { email: userData.email },
      });        
      if (data.email) {
        const validate = await verify(data.password, userData.password);
        if(validate){
          return returnObjectFunction(true,201,`Login Successfull...`)
        }else{
          return returnObjectFunction(false,401,`Invalid Credentials...`)
        }

      } else {
        return returnObjectFunction(false, 404, `User doesn't Exists...`);
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
