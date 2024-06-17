import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "./role.entity";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column({default:1})
    role_id:number

    @Column()
    password:string;
    
    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
    
    @DeleteDateColumn()
    deletedAt: Date
    
    @ManyToOne((role)=>Roles)
    @JoinColumn({name:'role_id'})
    roles:Roles
    
}