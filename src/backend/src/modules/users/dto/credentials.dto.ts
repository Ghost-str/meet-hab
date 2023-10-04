import { IsAlphanumeric, Length, IsNotEmpty } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @Length(10, 70)
  @IsAlphanumeric()
  login: string;

  @IsNotEmpty()
  password: string;
}
