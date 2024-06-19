import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, FindUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { catchError, returnObjectFunction } from 'src/helper/genralFunction';
import { verify } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const data = this.userRepository.create(createUserDto);
      await this.userRepository.insert(data);

      return returnObjectFunction(true,201,`User registered succcessfully..`);
      
    } catch (error) {
      return catchError(error);
    }
  }

  async getUserProfile(id:number) {
    try {
        const data =await this.userRepository.findOne({where:{id:id}});
        if(data.id){
            return returnObjectFunction(true,201, `User profile Successfully..`)
        }else{
          return returnObjectFunction(false,404, `User Profile not found...`)
        }
    } catch (error) {
      return catchError(error)
    }
  }

  async findUserByEmail(email:string){
    try {
      const data = await this.userRepository.findOne({where:{email:email}});
      if(data.id){
          return returnObjectFunction(true,201,"User Profile found...", data)
      }else{
        return returnObjectFunction(false,404,'User doesnt exists...');
      }
    } catch (error) {
      return catchError(error);
    }

  }

  async verifyUser(userData: FindUser) {
    try {
      const data = await this.userRepository.findOne({
        where: { email: userData.email },
      });        
      if (data.email) {
        const validate = await verify(data.password, userData.password);
        if(validate){
          return returnObjectFunction(true,201,`Login Successfull...`, data)
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
