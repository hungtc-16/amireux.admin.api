import { Body, Controller, Get, Headers, Post, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './guards/access-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    @Public()
    @Post('signin')
    signIn(@Body() data: AuthDto) {
      return this.authService.signIn(data);
    }

    @Get('signout')
    signOut(@Req() data: any) {
      return this.authService.signOut(data.user.sub, "")
    }

    @Public()
    @Post('refresh-token')
    async refreshToken(@Headers() headers: any)
    {
      console.log("headers",headers)
      const decodedJwtAccessToken: any = this.jwtService.decode(headers.authorization.split(" ")[1]);
      const data = {
        id: decodedJwtAccessToken.sub, 
        refresh_token: headers.refreshtoken
      }
      const result = await this.authService.refreshToken(data);
      return result;
}
}
