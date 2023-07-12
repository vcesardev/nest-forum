import { IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  createdAt: Date;

  updatedAt?: Date;
}
