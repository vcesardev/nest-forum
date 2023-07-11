import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  readonly email: string;

  @IsStrongPassword({ minLength: 6 })
  readonly password: string;
}
