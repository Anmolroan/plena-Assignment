import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'prisma/prisma.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';


@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService,private rabbitmqService: RabbitMQService) {}
    async createComment(createCommentDto: CreateCommentDto,user_id:number) {
        try {
          const comment = await this.prisma.comment.create({
            data: {
              ...createCommentDto,
              authorId:user_id,
              updatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
          });
             // Increment the comment count in the post table
            const postId = createCommentDto.postId
      const post = await this.prisma.post.update({
        where: { id: postId },
        data: {
          commentCount: { increment: 1 },
        },
      });
  
      // Publish a comment created event
      const message = JSON.stringify({
        type: 'comment_created',
        payload: {
          postId,
          commentId: comment.id,
          comment,
          commentCount: post.commentCount,
        },
      });
  
         this.rabbitmqService.publish('post', 'comment.created', message);
          return comment;
        } catch (err) {
          throw new HttpException(err.response, err.status);
        }
      }
    
      async getComments(id: number) {
        try {
          const comments = await this.prisma.comment.findMany({
            where: {
              postId: id,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
          return comments;
        } catch (err) {
          throw new HttpException(err.response, err.status);
        }
      }
    

 
    
      async deleteComment(id: number) {
        try{
          const deletedComment = await this.prisma.comment.delete({
            where:{
              id:id
            }
          })

             // Decrement the comment count in the post table
    const post = await this.prisma.post.update({
        where: { id: deletedComment.postId },
        data: {
          commentCount: { decrement: 1 },
        },
      });
  
      // Publish a comment deleted event
      const message = JSON.stringify({
        type: 'comment_deleted',
        payload: {
          postId: deletedComment.postId,
          id: deletedComment.id,
          commentCount: post.commentCount,
        },
      });
  
      this.rabbitmqService.publish('post', 'comment.deleted', message);
          return {success:true}
        }catch(err){
          throw new HttpException('comment not found', HttpStatus.NOT_FOUND)
        }
    
      }
}
