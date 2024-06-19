import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Roles } from './role.entity';
import { Permissions } from './permission.entity';

@Entity('role_permissions')
export class RolePermissions{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    role_id: number;

    @Column()
    permission_id: number;

    @ManyToOne((roles)=> Roles)
    @JoinColumn({name:"role_id"})
    role:Roles

    @ManyToOne((permission)=> Permissions)
    @JoinColumn({name:"permission_id"})
    permission:Permissions


}