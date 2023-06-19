import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Get()
    getAllRooms() {
        return this.roomService.getAllRooms();
    }
}
