import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum UserRole {
 admin = 'ADMIN',
  user = 'USER',
}
@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole, unique:true })
  roles: 'ADMIN' | 'USER';

  @OneToMany(() => User, (user) => user.roles)
  users: User[];
}
