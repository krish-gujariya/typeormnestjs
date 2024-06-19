import { Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from './entities/discussion.entity';

@Module({
  imports:[UsersModule, TypeOrmModule.forFeature([Discussion])],
  controllers: [DiscussionsController],
  providers: [DiscussionsService],
})
export class DiscussionsModule {}
