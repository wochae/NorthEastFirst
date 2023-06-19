import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomRepository)
        private roomRepository: RoomRepository
    ) {}

    getAllRooms(): Promise<Room[]> {
        return this.roomRepository.getAllRooms();
    }
}
