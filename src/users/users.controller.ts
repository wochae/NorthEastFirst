import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    createUser(
        @Body() signInDto: SignInDto
        ): Promise<User> {
            return this.usersService.createUser(signInDto);
        }
}

