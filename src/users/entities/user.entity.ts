import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './role.entity';
import { genPassword } from 'src/helper/genralFunction';
import { UserAcceptedProblems } from 'src/problems/entities/userProbllem.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 1 })
  role_id: number;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne((role) => Roles)
  @JoinColumn({ name: 'role_id' })
  roles: Roles;


  @OneToMany(()=>UserAcceptedProblems, (userProblem)=> userProblem.user)
  userProblems: UserAcceptedProblems[]

  @BeforeInsert()
  public async hashpass() {
    this.password = await genPassword(this.password);
  }
}
