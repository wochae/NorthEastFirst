import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HttpModule } from '@nestjs/axios'
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    HttpModule,
    UsersModule,
  ],
})
export class AppModule {}
