import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDTO } from './dtos/ICreatePost.dto';
import { v4 as uuidv4 } from 'uuid';
import { EditPostDTO } from './dtos/IEditPost.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, data: CreatePostDTO) {
    return await this.prismaService.post.create({
      data: {
        content: data.content,
        id: uuidv4(),
        title: data.title,
        user: { connect: { id: userId } },
        createdAt: new Date(),
        updatedAt: null,
      },
    });
  }

  async list() {
    return await this.prismaService.post.findMany();
  }

  async find(postId: string) {
    const postData = await this.prismaService.post.findFirst({
      where: { id: postId },
      include: { user: true },
    });

    if (!postData) {
      throw new BadRequestException('post not found.');
    }

    delete postData.user.password;

    return postData;
  }

  async edit(postId: string, data: EditPostDTO) {
    const postData = await this.prismaService.post.update({
      where: { id: postId },
      data: {
        content: data.content,
        title: data.title,
        updatedAt: new Date(),
      },
      include: { user: true },
    });

    if (!postData) {
      throw new BadRequestException('post not found.');
    }

    delete postData.user.password;

    return postData;
  }

  async delete(postId: string) {
    const postFound = await this.prismaService.post.findFirst({
      where: { id: postId },
    });

    if (!postFound) {
      throw new BadRequestException('post not found.');
    }

    return await this.prismaService.post.delete({ where: { id: postId } });
  }
}
