import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModule } from 'src/users/users.module';
import { Problem } from './entities/problem.entity';
import { Categories } from './entities/categories.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Problem,Categories])],
  controllers: [ProblemsController ],
  providers: [
    CategoryService,
    ProblemsService,
  ],
  exports: [ProblemsService],
})
export class ProblemsModule {}
