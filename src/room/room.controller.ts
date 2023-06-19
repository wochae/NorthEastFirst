import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Get()
    getAllRooms() {
        return this.roomService.getAllRooms();
    }

    @Post()
    CreateRoom(
        @Body()dto: CreateRoomDto
        ): Promise<Room> {
        return this.roomService.createRoom(dto);
    }
}
