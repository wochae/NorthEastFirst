import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios'
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.providers';
@Module({
  imports: [
    UsersModule,
    HttpModule,
    DatabaseModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: {
        expiresIn: config.get('jwt.expiresIn')
      }
    }),
  ], 
  providers: [AuthService, UserService, ...usersProviders, JwtStrategy, JwtModule],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}
