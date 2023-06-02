import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
// Nest.js can inject it anywhere this service is needed
// via its Dependency Injection system.
export class JwtStrategy extends PassportStrategy(Strategy) {
    // The class extends the PassportStrategy class defiened by @nestjs/passport package
    // you're passing the JWT Strategy defined by the passport-jwt Node.js package.
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        // passes tow important options
        super({
            secretOrKey: 'Secret1234',
            // This configures the secret key that JWT Strategy will use
            // to decrypt the JWT token in order to validate it
            // and access its payload.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            // This configures the Strategy (imported from passport-jwt package)
            // to look for the JWT in the Authorization Header of the current Request
            // passed over as a Bearer token.
        })
    }

    // 위에서 토큰이 유효한 지 체크가 되면 validate 메소드에서 payload에 있는 유저이름이 데이터베이스에서
    // 있는 유저인지 확인 후 있다면 유저 객체를 return값으로 던져줍니다.
    // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어갑니다.
    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOneBy({ username });

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
