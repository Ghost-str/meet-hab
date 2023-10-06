import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiTags('auth')
  async login(@Body() cred: CredentialsDto) {
    const user = this.authService.login(cred);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  @Post('register')
  @ApiTags('user')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
