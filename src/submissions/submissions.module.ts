import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { UsersModule } from 'src/users/users.module';
import { Validation } from './submission.validation';
import { Problem } from 'src/problems/entities/problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, Problem]), UsersModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, Validation],
})
export class SubmissionsModule {}
