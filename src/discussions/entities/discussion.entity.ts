import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum EntityModel{
    disscussion= "Discussion",
    problem = "Problems"
}

@Entity("discussions")
export class Discussion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id :number

  @Column()
  entity_id :number

  @Column({type:"enum", enum:EntityModel })
  entity_type: "Discussion"| "Problems"

  @Column()
  content: string

  @Column()
  likes: number

  @Column()
  dislike: number


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;


}
