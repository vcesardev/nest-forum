import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PostGuard } from '../posts/guards/postGuard.guard';
import { CreateCommentDTO } from './dtos/ICreateComment.dto';
import { CommentsService } from './comments.service';
import { User } from '../../types/User';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post(':id')
  async comment(
    @Request() req,
    @Body() body: CreateCommentDTO,
    @Param('id') id: string,
  ) {
    const user: User = req.user;
    const userId = user.id;
    return await this.commentService.comment(id, body, userId);
    //coment
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.commentService.find(id);
  }

  @Post(':id')
  async edit() {
    //edit
  }

  @Post(':id')
  async delete() {
    //delete
  }
}
