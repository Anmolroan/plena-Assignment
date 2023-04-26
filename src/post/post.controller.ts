import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostSearchParams } from './entities/postsearch.entity';
import { UpdatepostDto } from './dto/update-post.dto';



@ApiBearerAuth()
@ApiTags('POST Api')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) // private jwtService:JwtService
  {}

  @Post('create')
  @ApiOperation({
    summary: 'create a Post',
    description: 'Takes the request body and will create a POST',
  })
  createPost(@Body() createPostDto: CreatePostDto,@Req() req) {
    const user_id = req.user.user_id;
 
    return this.postService.createPost(createPostDto,+user_id);
  }


  @Get(':title')
  @ApiOperation({
    summary: 'Get all Post By a title ',
    description: 'Get all the posts by title',
  })
  getPostsByTitle(@Param('title') title: string) {
    return this.postService.getPostsByTitle(title);
  }

  @Get('')
  @ApiOperation({
    summary: 'Get all Post By a searchTerm',
    description: 'Get all the posts by searchTerm',
  })
  searchPost(@Query() query:PostSearchParams) {
    return this.postService.searchPost(query);
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Patch Post By id',
    description: 'patch post by id',
  })
  updatePost(@Param("id") id:string, @Body() updatePostDto: UpdatepostDto) {
    return this.postService.updatePost(+id,updatePostDto);
  }



  @Delete(':id')
  @ApiOperation({
    summary: 'Delete post by id',
    description: 'Delete post by Id',
  })
  deletePost(@Param("id") id:string) {
    return this.postService.deletePost(+id);
  }

}
