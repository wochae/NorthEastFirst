import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-jwt";

@Injectable()
export class pingStrategy extends PassportStrategy(Strategy, 'ping') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    });
  }
  async validate(accessToken: string, refreshToken: string) {
    const result = await this.authService.validateUser(accessToken);
    if (!result) throw new UnauthorizedException('Unauthorized');
    return result;
  }
}
