import { Module } from '@nestjs/common';
import {config} from 'dotenv';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Roles } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
config();
const token = process.env.TOKEN;

@Module({
  imports: [JwtModule.register({global:true, secret:token}),TypeOrmModule.forFeature([User, Roles])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService,],
})
export class UsersModule {}
