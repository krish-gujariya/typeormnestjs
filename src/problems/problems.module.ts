import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModule } from 'src/users/users.module';
import { Problem } from './entities/problem.entity';

@Module({
  imports: [UsersModule,TypeOrmModule.forFeature([Problem]) ],
  controllers: [ProblemsController],
  providers: [ProblemsService, Repository<Problem>],
  exports:[ProblemsService]
})
export class ProblemsModule {}
