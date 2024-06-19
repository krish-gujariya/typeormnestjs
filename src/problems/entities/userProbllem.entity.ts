import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("userAcceptedProblems")
export class UserAcceptedProblems{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    user_id:number

    @Column()
    problem_id:number

    
}