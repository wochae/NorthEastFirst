export class UserDto {
    constructor(id: number, nickname: string, image: string) {
      this.id = id;
      this.nickname = nickname;
      this.image = image;
    }
  
    id: number;
  
    nickname: string;  
    // //@IsUrl()
    image: string;
  }