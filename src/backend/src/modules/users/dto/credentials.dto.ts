import { IsAlphanumeric, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @IsNotEmpty()
  @Length(5, 70)
  @IsAlphanumeric()
  @ApiProperty({
    example: 'someLogin',
    description: 'user login',
  })
  login: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'some-goodPassword1{',
    description: 'user password',
  })
  password: string;
}
