import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}


	async signIn(data: AuthDto) {
    // Check if user exists
    const user : User = await this.usersService.findByUsername(data.username);
    if (!user) throw new BadRequestException('User does not exist');
    if (user.password !== data.password)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.username);
    this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  
  async signOut(userId: number, accessToken: string) {
    this.updateRefreshToken(userId, accessToken);
    return {
      statusCode: 200,
      message: "Ok"
    }
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.usersService.update(userId, {
      refresh_token: refreshToken,
    });
  }    

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}