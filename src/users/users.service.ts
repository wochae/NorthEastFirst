import { Connection, Repository } from "typeorm";
import { Auth, User } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserService {
  private connectionList = new Map<string, Connection>();

  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
  ) {}
  async addUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { id, nickname, image, email } = createUserDto;

    let user = this.usersRepository.create({
      id,
      nickname,
      image,
    });
    user = await this.usersRepository.save(user);

    let authId = 1;
    const maxAuthId = await this.authRepository
      .createQueryBuilder('auth')
      .select('MAX(auth.id)', 'id')
      .getRawOne();
    if (maxAuthId.id !== null) authId = maxAuthId.id + 1;

    const auth = this.authRepository.create({
      id: authId,
      email,
      authenticated: false,
      user,
    });
    await this.authRepository.save(auth);

    const userDto = new UserDto(user.id, user.nickname, user.image);
    return userDto;
  }

  async getUser(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    const userDto = new UserDto(user.id, user.nickname, user.image);
    return userDto;
  }
  async requestAuth(id: number) {
    const userAuth = await this.authRepository.findOne({
      relations: ['user'],
      where: { user: { id: id } },
    });
  }

//   async getAuth(id: number): Promise<AuthUserDto> {
//     // SELECT * FROM public."auth"
//     // LEFT JOIN "user" ON "user"."id" = id
//     // WHERE "auth"."userId" = "user"."id";
//     const auth = await this.authRepository.findOne({
//       relations: { user: true },
//       where: { user: { id: id } },
//     });
//     if (auth === null)
//       throw new NotFoundException('유저의 인증 정보가 없습니다.');

//     const authUserDto = new AuthUserDto();
//     authUserDto.authenticated = auth.authenticated;

//     return authUserDto;
//   }
}