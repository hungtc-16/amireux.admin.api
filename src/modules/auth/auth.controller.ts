import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './guards/access-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signin')
    signIn(@Body() data: AuthDto) {
      return this.authService.signIn(data);
    }

    @Get('signout')
    signOut(@Req() data: any) {
      return this.authService.signOut(data.user.sub, "")
    }
}
