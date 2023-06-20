import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
// import { RoomRepository } from './room.repository';
import { RoomGateway } from './room.gateway';
import { roomProviders } from './room.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // database, auth modules
  controllers: [RoomController],
  providers: [RoomService, RoomGateway, ...roomProviders],
})
export class RoomModule {}
