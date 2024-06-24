import { Likes } from 'src/likes/entities/like.entity';
import { Problem } from 'src/problems/entities/problem.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum EntityModel {
  disscussion = 'Discussion',
  problem = 'Problems',
}

@Entity('discussions')
@Unique(['user_id', 'entity_id', 'entity_type'])
export class Discussion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  entity_id: number;

  @Column({ type: 'enum', enum: EntityModel })
  entity_type: 'Discussion' | 'Problems';

  @Column()
  content: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislike: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Likes, (likes) => likes.entity_id)
  userLikes: Likes[];

  @ManyToOne(() => User, (user) => user.discussions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Discussion, (disscussion) => disscussion.entity_id)
  parentDisscussion: Discussion[];
}
