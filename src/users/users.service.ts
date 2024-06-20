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
      const data = this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        discussions: [
          { entity_id: 1, entity_type: 'Problems', content: 'vbbbnnfhdfytvffghgh' },
          { entity_id: 2, entity_type: 'Problems', content: 'jn jk n knj jkn ' },
          { entity_id: 3, entity_type: 'Problems', content: 'bjb j bk b jkb jk bk ' },
          { entity_id: 4, entity_type: 'Problems', content: ' bnjkb  yuv v vuv uyvvuj vvyh v ' },
          { entity_id: 5, entity_type: 'Problems', content: 'AERTsvhJhv vJ vJvJ V vjvjVj' },
          { entity_id: 6, entity_type: 'Problems', content: ' vgGV VGV hgvVV GVGvgHV vhVH  HV Hv ' },
          { entity_id: 7, entity_type: 'Problems', content: ' njk n jkn jkn jkn kjn jk kn kj njkn kn kjn k ' },
      ],
        likes:[
          {problem:{title:"hnjknkjnjknjknkjn", description:"bbjhbjhbjhbjhbjhbjh"}},
          {problem:{title:"Problem2", description:"jk bhk bj bj kb kj b"}},
          {problem:{title:"Problem1", description:"Description1"}},
          {problem:{title:"Problem2", description:"Description2"}},
          {problem:{title:"Problem3", description:"Description3"}},
          {problem:{title:"Problem4", description:"Description4"}},
          {problem:{title:"Problem5", description:"Description5"}},
          {problem:{title:"Problem6", description:"Description6"}},
      ]
      });
      await this.userRepository.save(data);

      return returnObjectFunction(true, 201, `User registered succcessfully..`);
    } catch (error) {
      return catchError(error);
    }
  }

  async getUserProfile(id: number) {
    try {
      const data = await this.userRepository.findOne({
        where: { id: id }
      });
      if (data.id) {
        return returnObjectFunction(true, 201, `User profile Successfully..`, data);
      } else {
        return returnObjectFunction(false, 404, `User Profile not found...`);
      }
    } catch (error) {
      return catchError(error);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const data = await this.userRepository.findOne({
        where: { email: email },
      });
      if (data.id) {
        return returnObjectFunction(true, 201, 'User Profile found...', data);
      } else {
        return returnObjectFunction(false, 404, 'User doesnt exists...');
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

      if (data) {
        const validate = await verify(data.password, userData.password);
        if (validate) {
          return returnObjectFunction(true, 201, `Login Successfull...`, data);
        } else {
          return returnObjectFunction(false, 401, `Invalid Credentials...`);
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
