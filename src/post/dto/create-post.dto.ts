import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'The Title of the Post',
    example: 'Travel',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Title should be at between 3 and 20 characters' })
  public title: string;

  @ApiProperty({
    description: 'The counts ofcomment for the Post',
    example: 'Travel',
  })
  @IsOptional()
  public commentCount: number;

  @ApiProperty({
    description: 'The Desription  of the Post',
    example: 'hello guys this is the des of post',
  })
  @IsNotEmpty()
  @IsString()
  @Length(10, 300, {
    message: 'Password Desription be at between 10 and 3000 characters',
  })
  public description: string;

  @ApiProperty({
    description: 'image link',
    example: 'aaa.jpg',
  })
  @IsNotEmpty()
  @IsString()
  public image:string;

  @ApiProperty({
    description: 'tags',
    example: '#Delhi',
  })
  @IsOptional()
  public tags: string[];

  // @ApiProperty({
  //   description: 'authorId',
  //   example: '2',
  // })
  // @IsNotEmpty()
  // public authorId: number;

}
