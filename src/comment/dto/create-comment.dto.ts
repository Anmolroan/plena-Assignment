import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The Title of the Post',
    example: 'Travel',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 200, { message: 'content should be at between 2 and 200 characters' })
  public content: string;

   @ApiProperty({
    description: 'postId',
    example: '2',
  })
  @IsNotEmpty()
  public postId: number;

}
