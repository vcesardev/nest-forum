import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateCommentDTO } from './dtos/ICreateComment.dto';
import { CommentsService } from './comments.service';
import { User } from '../../types/User';
import { EditCommentDTO } from './dtos/IEditComment.dto';

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
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.commentService.find(id);
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() data: EditCommentDTO) {
    return await this.commentService.edit(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commentService.delete(id);
  }
}
