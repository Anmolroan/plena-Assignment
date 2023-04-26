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
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
@ApiBearerAuth()
@ApiTags('Comment Api')
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
      ) // private jwtService:JwtService
      {}
    
      @Post('create')
      @ApiOperation({
        summary: 'create a comment',
        description: 'Takes the request body and will create a Comment',
      })
      createPost(@Body() createCommentDto: CreateCommentDto,@Req() req) {
        const user_id = req.user.user_id;
        return this.commentService.createComment(createCommentDto,+user_id);
      }
    
      @Get('')
      @ApiOperation({
        summary: 'Get all comments on a post ',
        description: 'get all comments on a post ',
      })
      getPosts(@Query() query:{postId: string}) {
        const {postId} = query;
        return this.commentService.getComments(+postId);
      }

      @Delete(':id')
      @ApiOperation({
        summary: 'Delete a comment by id',
        description: 'Delete a comment by id',
      })
      deletePost(@Param("id") id:string) {
        return this.commentService.deleteComment(+id);
      }
}
