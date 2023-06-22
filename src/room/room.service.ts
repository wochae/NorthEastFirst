import { Inject, Injectable } from '@nestjs/common';
import { Room, RoomParticipant } from './room.entity';
import { CreateRoomDto } from './dto/room.dto';
import { JoinRoomDto } from './dto/room.dto';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(
        @Inject('ROOM_REPOSITORY')
        private roomRepository: Repository<Room>,
        @Inject('ROOM_PARTICIPANT_REPOSITORY')
        private roomParticipantRepository: Repository<RoomParticipant>
    ) {}

    async getAllRooms(): Promise<Room[]> {
        return await this.roomRepository.find();
    }

    async createRoom(dto: CreateRoomDto): Promise<Room> {
        const { roomName } = dto;
        const room = this.roomRepository.create({ roomName});
        try {
            await this.roomRepository.save(room);
        } catch (error) {
            console.log(error);
        }
        return room;
    }

    async joinRoom(client: Socket, dto: JoinRoomDto) {
        const { roomId, userId } = dto;
        let parti : RoomParticipant;
        const room = await this.roomRepository.findOneBy({ id: roomId });
        if (!room) throw new Error('Room not found');
        // participant is trying to join the room where has been existed;

        parti = await this.roomParticipantRepository.findOne({
            relations: { user: true },
            where: { user: {id: userId}, room: {id: roomId} },
        });
        if (parti) throw new Error('Already joined');
        
        parti = this.roomParticipantRepository.create({ user: {id: userId}, room: {id: roomId} }); // idx would be automatically inclemented by DB??
        await this.roomParticipantRepository.insert(parti); // not use save, because it is not a entity, but just a object
        client.to(room.roomName).emit('joinMessage', {
            user: {
                id: userId,
                room,
            },
        });
        client.rooms.forEach((room) => {
            client.leave(room);
        });
        client.join(room.roomName);
    }
}
