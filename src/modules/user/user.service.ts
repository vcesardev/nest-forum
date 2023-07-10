import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/ICreateUser.dto';
import { UpdateUserDTO } from './dtos/IUpdateUser.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { convertDate } from './utils/convertDate';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  data = [
    {
      id: '1',
      name: 'test',
      email: 'test@email.com',
    },
  ];

  async create(data: CreateUserDTO) {
    const birthDate = convertDate(data.birthDate);

    return await this.prismaService.user.create({
      data: {
        id: uuidv4(),
        birthdate: birthDate,
        email: data.email,
        name: data.name,
        createdAt: new Date(),
        updatedAt: new Date(),
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

    return user;
  }

  async update(id: string, data: UpdateUserDTO) {
    return await this.prismaService.user.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id: string) {
    return await this.prismaService.user.delete({ where: { id: id } });
  }
}
