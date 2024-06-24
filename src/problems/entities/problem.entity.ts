import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Likes } from "src/likes/entities/like.entity";
import { Discussion } from "src/discussions/entities/discussion.entity";
import { Categories } from "./categories.entity";
import { Submission } from "src/submissions/entities/submission.entity";
import { TestCases } from "./testcases.entity";

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

  @Column()
  category_id:number

  @Column({default:0})
  acceptance_rate:number

  @Column({default:0})
  time_limit:number

  @Column({default:0})
  memory_limit:number

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

  @ManyToOne(()=> Categories)
  @JoinColumn({name:"category_id"})
  category:Categories

  @OneToMany(()=> Discussion, (disscussion)=> disscussion.entity_id)
  disscussions: Discussion[]

  @OneToMany (()=>Likes, (likes)=>  likes.entity_id )
  userLikes:Likes[]


  @OneToMany(()=>Submission, (submission)=> submission.problem ,{cascade:true})
  submissions: Submission[]

  @OneToMany(()=> TestCases, (testcases)=> testcases.problem, {cascade:true})
  testcases:TestCases[]
  

}
