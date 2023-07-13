import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDTO } from './ICreateComment.dto';

export class EditCommentDTO extends PartialType(CreateCommentDTO) {}
