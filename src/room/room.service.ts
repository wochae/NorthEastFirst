import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomRepository)
        private roomRepository: RoomRepository
    ) {}

    getAllRooms(): Promise<Room[]> {
        return this.roomRepository.getAllRooms();
    }

    createRoom(dto: CreateRoomDto): Promise<Room> {
        // something's validation here
        return this.roomRepository.createRoom(dto);
    }
}
