import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDTO } from './dtos/ICreateComment.dto';
import { EditCommentDTO } from './dtos/IEditComment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async comment(postId: string, data: CreateCommentDTO, authorId: string) {
    const post = await this.prismaService.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      throw new BadRequestException('post not found.');
    }

    return await this.prismaService.comment.create({
      data: {
        content: data.content,
        id: uuidv4(),

        createdAt: new Date(),
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      },
    });
  }

  async find(id: string) {
    const post = await this.prismaService.post.findFirst({ where: { id: id } });

    if (!post) {
      throw new BadRequestException('post not found.');
    }

    return await this.prismaService.comment.findFirst({
      where: { id: id },
      include: { post: true, author: true },
    });
  }

  async edit(id: string, data: EditCommentDTO) {
    return await this.prismaService.comment.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async delete(id: string) {
    const post = await this.prismaService.post.findFirst({ where: { id: id } });

    if (!post) {
      throw new BadRequestException('post not found.');
    }

    return await this.prismaService.post.delete({ where: { id: id } });
  }
}
