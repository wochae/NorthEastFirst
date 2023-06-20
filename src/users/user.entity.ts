import { RoomParticipant } from "src/room/room.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @OneToMany(() => RoomParticipant, (roomParticipant) => roomParticipant.user,)
    roomParticipants: RoomParticipant[];
}