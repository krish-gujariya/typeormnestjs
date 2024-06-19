import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Problem } from "./problem.entity";
import { User } from "src/users/entities/user.entity";

@Entity("userAcceptedProblems")
@Unique(['user_id', 'problem_id'])
export class UserAcceptedProblems{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    user_id:number

    @Column()
    problem_id:number

    @ManyToOne((user)=> User)
    @JoinColumn({name:"user_id"})
    user: User

    @ManyToOne((problem)=> Problem)
    @JoinColumn({name:"problem_id"})
    problem:Problem




    
}