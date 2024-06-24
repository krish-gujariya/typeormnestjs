import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Problem } from "./problem.entity";

@Entity("testcases")
export class TestCases{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    problem_id: number

    @Column()
    input:string

    @Column()
    output:string

    @Column({default:false})
    visibility:boolean

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  

    @ManyToOne(()=> Problem)
    @JoinColumn({name:"problem_id"})
    problem: Problem
}