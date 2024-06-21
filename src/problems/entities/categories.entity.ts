import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Problem } from "./problem.entity";

@Entity("categories")
export class Categories{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    category:string;

    @OneToMany(()=> Problem, (problem)=> problem.category ,{cascade:true})
    problems: Problem[]
}