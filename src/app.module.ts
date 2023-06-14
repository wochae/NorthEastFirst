import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
// import { AuthModule } from './auth/auth.module';
// import { GatewayModule } from './gateway/gateway.module';
// import { SocketModule } from './socket/socket.module';
// import { WebsocketsModule } from './websockets/websockets.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EventsModule, 
    UsersModule,
    TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
