import { IsString, IsEmail, IsStrongPassword, IsInt } from 'class-validator';
import { Role } from '../../../types/User';

export class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly birthDate: string;

  @IsStrongPassword({ minLength: 6 })
  password: string;

  role: Role;
}
