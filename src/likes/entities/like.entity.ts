import { Discussion } from 'src/discussions/entities/discussion.entity';
import { Problem } from 'src/problems/entities/problem.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('likes')
@Unique(['user_id', 'entity_id', 'entity_type'])
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  entity_type: 'Disscussion' | 'Problem';

  @Column()
  entity_id: number;

  @Column()
  like: 'LIKE' | 'DISLIKE';

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  users: User;
}
