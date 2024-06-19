import { Discussion } from "src/discussions/entities/discussion.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("likes")
export class Like {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    user_id:number

    @Column()
    entity_type: string

    @Column()
    entity_id:number

    @ManyToOne((user)=> User)
    @JoinColumn({name:"user_id"})
    users:User

    // @ManyToOne((disscussion)=>Discussion)
    // @JoinColumn({ent})

}
