import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/ICreateUser.dto';
import { UpdateUserDTO } from './dtos/IUpdateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async find(@Param() param) {
    const { id } = param;
    return this.userService.findById(id);
  }

  @Patch(':id')
  async update(@Body() body: UpdateUserDTO, @Param() param) {
    const { id } = param;
    return this.userService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param() param) {
    const { id } = param;
    return this.userService.delete(id);
  }
}
