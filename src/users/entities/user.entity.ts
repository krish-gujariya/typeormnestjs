import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './role.entity';
import { genPassword } from 'src/helper/genralFunction';
import { Discussion } from 'src/discussions/entities/discussion.entity';
import { Likes } from 'src/likes/entities/like.entity';
import { Submission } from 'src/submissions/entities/submission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable:true, type:"enum", enum:["Male","Female"]})
  gender: "Male"|"Female";

  @Column({nullable:true})
  city: string;

  @Column({nullable:true})
  country: string;

  @Column({nullable:true})
  birthdate: Date;

  @Column({nullable:true})
  summary: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 1 })
  role_id: number;

  @Column()
  password: string;

  @Column({nullable:true})
  profileImg:string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne((role) => Roles)
  @JoinColumn({ name: 'role_id' })
  roles: Roles;


  @OneToMany(()=> Discussion, (disscussion)=> disscussion.user)
  discussions:Discussion[]

  @OneToMany(()=> Likes, (likes)=> likes.users)
  likes:Likes[]

  @OneToMany(()=>Submission, (submission)=> submission.user  ,{cascade:true})
  submissions: Submission[]

  @BeforeInsert()
  public async hashpass() {
    this.password = await genPassword(this.password);
  }
}
