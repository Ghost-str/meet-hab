import {
  IsUUID,
  Length,
  IsAlphanumeric,
  IsStrongPassword,
  IsEmail,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsUUID()
  @ApiProperty({
    description: 'UUID',
    example: '93578254-4f13-437e-90d9-9a170817905c',
  })
  id: string;

  @Length(5, 70)
  @IsAlphanumeric()
  @ApiProperty({
    description: 'user login min 5 symbols, max 70 symbols',
    example: 'someLogin',
  })
  login: string;

  @IsStrongPassword()
  @ApiProperty({
    description: 'password',
    example: 'some-goodPassword1{',
  })
  password: string;

  @IsEmail()
  @ApiProperty({
    description: 'email',
    example: 'some-email@example.com',
  })
  email: string;
}
