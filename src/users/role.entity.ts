import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';

enum UserRole{
    "ADMIN",
    "USER"
}
@Entity('roles')
export class Roles{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"enum", enum:UserRole, default:"USER"})
    roles:"ADMIN"|"USER"

    @OneToMany(()=> User, (user)=> user.roles)
    users: User[]

}