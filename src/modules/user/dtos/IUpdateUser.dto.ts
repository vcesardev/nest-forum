import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './ICreateUser.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
