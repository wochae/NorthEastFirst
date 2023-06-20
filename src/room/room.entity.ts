import { User } from "src/users/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomName: string;

    // @OneToMany(type => User, user => user.room, { eager: true })
    // users: User[];
    // 방을 참조하는게 아니라 방 리스트라는 것을 만들어서 유저들을 넣어 놓으면 됨. 다대다기 때문.
    @OneToMany(() => RoomParticipant, (roomParticipant) => roomParticipant.room)
    roomParticipants: RoomParticipant[];
}

@Entity()
export class RoomParticipant {
    @PrimaryGeneratedColumn()
    idx : number;

    @Column({ nullable: true, type: 'timestamp' })
    statusStartTime: Date; 

    @ManyToOne(() => User, (user) => user.roomParticipants)
    user: User;

    @ManyToOne(() => Room, (room) => room.roomParticipants)
    room: Room;
}