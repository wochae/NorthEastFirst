import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    EventsModule, 
    UsersModule,
    TypeOrmModule.forRoot(typeORMConfig),
    RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
