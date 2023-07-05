import {   Controller,
    Get,
    Header,
    Post,
    Req,
    Request,
    Res,
    UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('logout')
  @Header('Set-Cookie', 'Authentication=; Path=/; HttpOnly; Max-Age=0')
  logout() {
    return { message: '로그아웃 되었습니다.' };
  }

  @UseGuards(AuthGuard('ping'))
  @Get('login')
  login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('ping'))
  @Get('ping-redirect')
  async pingAuthRedirect(@Request() req, @Res({ passthrough: true }) res) {
    // passthrough : 응답을 보내기 위한 옵션
    await this.authService.createJwtToken(req.user, res);
  }
}
