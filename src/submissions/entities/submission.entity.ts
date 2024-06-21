import { Problem } from 'src/problems/entities/problem.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum SubmissionStatus {
  accepted = 'Accepted',
  wrong_answer = 'Wrong Answer',
  memlimexid = 'Memory Limit Exceed',
  timelimexcid = 'Time Limit Exceed',
  runtimeerror = 'Runtime Error',
  servererr = 'Internal Error',
  compileerr = 'Compile Error',
}

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  problem_id: number;

  @Column()
  language: string;

  @Column()
  runtime: number;

  @Column()
  memory_usage: number;

  @Column({type:'enum', enum: SubmissionStatus , default : SubmissionStatus.accepted})
  status: SubmissionStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User,(user)=> user.submissions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Problem,(problem)=> problem.submissions)
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;
}
