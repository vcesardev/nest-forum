import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDTO } from './dtos/ICreateComment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async comment(postId: string, data: CreateCommentDTO, authorId: string) {
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
    return await this.prismaService.comment.findFirst({
      where: { id: id },
      include: { post: true, author: true },
    });
  }

  async edit() {
    //edit
  }

  async delete() {
    //delete
  }
}
