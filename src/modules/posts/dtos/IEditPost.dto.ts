import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './ICreatePost.dto';

export class EditPostDTO extends PartialType(CreatePostDTO) {}
