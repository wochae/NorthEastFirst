import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    roomName: string;
}