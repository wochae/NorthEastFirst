import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { SignInDto } from "./dto/create-user.dto";

import { DataSource, Repository } from "typeorm";

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(signInDto: SignInDto): Promise<User> {
        const {username} = signInDto;

        const user = this.create({ username });

        try {
            await this.save(user);
        } catch (error) {
            console.log(error);
        }
        return user;
    }
}