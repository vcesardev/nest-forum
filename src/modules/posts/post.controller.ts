import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/guards/auth.guard';

import { CreatePostDTO } from './dtos/ICreatePost.dto';
import { EditPostDTO } from './dtos/IEditPost.dto';
import { PostGuard } from './guards/postGuard.guard';

@UseGuards(AuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(PostGuard)
  @Post(':id')
  async create(@Param('id') id: string, @Body() data: CreatePostDTO) {
    return await this.postService.create(id, data);
  }

  @Get()
  async list() {
    return await this.postService.list();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.postService.find(id);
  }

  @UseGuards(PostGuard)
  @Patch(':id')
  async edit(@Param('id') id: string, @Body() data: EditPostDTO) {
    return await this.postService.edit(id, data);
  }

  @UseGuards(PostGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.postService.delete(id);
  }
}
