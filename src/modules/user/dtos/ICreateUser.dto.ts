import { IsString, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly birthDate: string;
}
