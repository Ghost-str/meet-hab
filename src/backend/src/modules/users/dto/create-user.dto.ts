import {
  IsUUID,
  Length,
  IsAlphanumeric,
  IsStrongPassword,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  id: string;

  @Length(10, 70)
  @IsAlphanumeric()
  login: string;

  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string;
}
