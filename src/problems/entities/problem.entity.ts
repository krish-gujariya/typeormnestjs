import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAcceptedProblems } from './userProbllem.entity';
import { Likes } from "src/likes/entities/like.entity";
import { Discussion } from "src/discussions/entities/discussion.entity";

export enum Difficulty{
    easy="Easy",
    medium="Medium",
    hard="Hard",
    extreme="Extreme"
}

@Entity('problems')
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({type:'enum',enum:Difficulty,default:Difficulty.easy})
  difficulty:"Easy"|"Medium"|"Hard"|"Extreme"

  @Column({default:0})
  acceptance_rate:number

  @Column({default:0})
  likes:number

  @Column({default:0})
  dislikes:number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(()=>UserAcceptedProblems, (userProblem)=> userProblem.problem)
  userProblems: UserAcceptedProblems[]

  @OneToMany(()=> Discussion, (disscussion)=> disscussion.problem)
  disscussions: Discussion[]

  @OneToMany (()=>Likes, (likes)=>  likes.problem )
  userLikes:Likes[]
}
