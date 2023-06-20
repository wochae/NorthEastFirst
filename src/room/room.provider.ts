import { DataSource } from "typeorm";
import { Room, RoomParticipant } from "./room.entity";

export const roomProviders = [
    {
        provide: 'ROOM_REPOSITORY',
        useFactory: (datasource :DataSource) => datasource.getRepository(Room),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ROOM_PARTICIPANT_REPOSITORY',
        useFactory: (datasource :DataSource) => datasource.getRepository(RoomParticipant),
        inject: ['DATA_SOURCE'],
    },
]