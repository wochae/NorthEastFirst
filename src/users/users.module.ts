import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './users.service';
import { usersProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  // NOTE: UserGateway 프로바이더를 넣어두면, 게임에도 있기 때문에 소켓이 두번씩 불러진다.
  providers: [UserService, ...usersProviders, ],
  exports: [UserService, ...usersProviders, ],
})
export class UsersModule {}
