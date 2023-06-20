export class CreateRoomDto {
    roomName: string;
}

export class JoinRoomDto {
    roomId: number;
    userId: number;
}

export class LeaveRoomDto {
    roomId: string;
    username: string;
}

export class MessageDto {
    roomId: string;
    username: string;
    message: string;
}