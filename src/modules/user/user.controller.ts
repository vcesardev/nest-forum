import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/ICreateUser.dto';
import { UpdateUserDTO } from './dtos/IUpdateUser.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ValidUserGuard } from './guards/validUser.guard';
import { RoleGuard } from '../../guards/roles.guard';
import { Roles } from './decorators/roles.decorators';
import { Role } from '../../types/User';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get()
  async list() {
    return this.userService.list();
  }

  @UseGuards(AuthGuard, ValidUserGuard, RoleGuard)
  @Get(':id')
  async find(@Param() param) {
    const { id } = param;
    return this.userService.findById(id);
  }

  @UseGuards(AuthGuard, ValidUserGuard, RoleGuard)
  @Patch(':id')
  async update(@Body() body: UpdateUserDTO, @Param() param) {
    const { id } = param;
    return this.userService.update(id, body);
  }

  @UseGuards(AuthGuard, ValidUserGuard)
  @Delete(':id')
  async delete(@Param() param) {
    const { id } = param;
    return this.userService.delete(id);
  }
}
