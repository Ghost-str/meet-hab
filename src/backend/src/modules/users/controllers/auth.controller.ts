import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import Response from 'src/shared-types/response';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiTags('auth')
  async login(
    @Body() cred: CredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = this.authService.login(cred, res);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  @Post('register')
  @ApiTags('user')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(createUserDto, res);
  }
}
