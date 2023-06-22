import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Room } from "./room.entity";
import { CreateRoomDto } from "./dto/room.dto";

// @Injectable()
// export class RoomRepository extends Repository<Room> {
//     constructor(private dataSource: DataSource) {
//         super(Room, dataSource.createEntityManager());
//     }

//     async getAllRooms(): Promise<Room[]> {
//         return await this.find();
//     }

//     async createRoom(dto: CreateRoomDto): Promise<Room> {
//         const { roomName } = dto;
//         const room = this.create({
//             roomName
//         });
//         await this.save(room);
//         return room;
//     }
// }