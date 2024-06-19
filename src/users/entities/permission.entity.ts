import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermissions } from "./rolePermission.entity";

@Entity('permissions')
export class Permissions{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    routes: string;

    @OneToMany(()=> RolePermissions, (rolePermission)=> rolePermission.permission)
    rolePermissions: RolePermissions[]
}