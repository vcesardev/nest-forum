import { IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  content: string;

  createdAt: Date;

  updatedAt: Date;
}
