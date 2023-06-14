import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto/create-user.dto';
import { User } from './user.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    )  {}

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.getAllUsers();
    }

    createUser(signInDto: SignInDto): Promise<User> {
        return this.usersRepository.createUser(signInDto);
    }
}