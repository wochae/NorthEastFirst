import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RoomService } from 'src/room/room.service';
import { JoinRoomDto } from './dto/room.dto';

@WebSocketGateway(3000, { namespace: 'chat', cors: true }) // room root? // 분리 { game, chat, friend } Generic 
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly roomService: RoomService) {}
    @WebSocketServer()
    server: Server;

    public handleConnection(client: Socket) {
        console.log('connected', client.id);
    }

    public handleDisconnect(client: Socket) {
        console.log('disconnected', client.id);
    }

    @SubscribeMessage('joinRoom')
    async joinChannel(
        @ConnectedSocket() client: Socket,
        @MessageBody() joinRoomDto: JoinRoomDto,
    ) {
        return await this.roomService.joinRoom(client, joinRoomDto);
    }
}

// module.exports = (server) => {
//     const io = SocketIO(server, { path: '/socket.io' });

//     io.on('connection', (socket) => {
//         const req = socket.request;

//         const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//         console.log('new client connected!', ip, socket.id, req.ip);

//         socket.on('disconnect', () => {
//             console.log('user disconnected', ip, socket.id);
//             clearInterval(socket.interval);
//         });
    
//         socket.on('error', (error) => {
//             console.error(error);
//         });
    
//         socket.on('reply', (data) => {
//             console.log(data);
//         });
    
//         socket.emit('news', 'Hello Socket.IO');
//     });

// }
