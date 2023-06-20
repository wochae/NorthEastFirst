import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignInDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    GetAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }
    @Post()
    createUser(
        @Body() signInDto: SignInDto
        ): Promise<User> {
            return this.usersService.createUser(signInDto);
        }
}

