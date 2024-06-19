import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, FindUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isPromise } from 'typeorm-extension';
import { generalResponse } from 'src/helper/generalResponseFunction';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    // private jwtService: JwtService

    ) {}

  @Post('login')
  async login(@Body() userdata: FindUser, @Res() response: Response) {
    const data = await this.usersService.findUserByEmail(userdata);
    if (data.success) {
    } else {
      return generalResponse(
        response,
        data.statusCode,
        false,
        data.message,
        data.result,
      );
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('create')
  async findOne(@Body() userData: CreateUserDto, @Res() res: Response) {
    Logger.log(userData);
    const data = await this.usersService.create(userData);
    Logger.log(data);
    return data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
