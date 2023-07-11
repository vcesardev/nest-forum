import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/ICreateUser.dto';
import { UpdateUserDTO } from './dtos/IUpdateUser.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { convertDate } from './utils/convertDate';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDTO) {
    const birthDate = convertDate(data.birthDate);

    const salt = 10;

    data.password = await bcrypt.hash(data.password, salt);

    return await this.prismaService.user.create({
      data: {
        id: uuidv4(),
        birthdate: birthDate,
        email: data.email,
        name: data.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: data.password,
        role: data.role || 1,
      },
    });
  }

  async list() {
    return await this.prismaService.user.findMany();
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new BadRequestException('user not found.');
    }

    delete user.password;

    return user;
  }

  async update(id: string, data: UpdateUserDTO) {
    if (data.password) {
      const salt = 10;

      data.password = await bcrypt.hash(data.password, salt);
    }

    return await this.prismaService.user.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id: string) {
    return await this.prismaService.user.delete({ where: { id: id } });
  }
}
