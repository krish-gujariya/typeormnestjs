import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';

@Entity('roles')
export class Roles{
    @PrimaryGeneratedColumn()
    id:number

    @Column('enum', {unique:true})
    roles:"ADMIN"|"USER"

    @OneToMany(()=> User, (user)=> user.roles)
    users: User[]

}