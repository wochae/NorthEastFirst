import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  constructor(id: number, nickname: string, image: string, email: string) {
    this.id = id;
    this.nickname = nickname;
    this.image = image;
    this.email = email;
  }

  @IsNumber()
  id: number;

  @IsString()
  nickname: string;

  //@IsUrl()
  image: string;

  @IsEmail()
  email: string;
}
