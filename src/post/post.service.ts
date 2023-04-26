import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostSearchParams } from './entities/postsearch.entity';
import { UpdatepostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async createPost(createPostDto: CreatePostDto,user_id:number) {
    try {
      const uniqueRecords = await this.prisma.post.findMany({
        where: {
          title: {
            contains: createPostDto.title,
            mode: 'insensitive',
          },
        },
      })
      ;
      if(uniqueRecords.length){
        throw new HttpException("title is already created", HttpStatus.CONFLICT);
      }

      const post = await this.prisma.post.create({
        data: {
          ...createPostDto,
          authorId:user_id,
          commentCount:0,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      });

      return post;
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async getPosts(id: number) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          authorId: id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return posts;
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async getPostsByTitle(title: string) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        },
      })
      return posts
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async searchPost(query:PostSearchParams) {
    
    
    try {
      const { title, tags, authorId, startDate, endDate } = query;
      const userId =+authorId
      let where = {};

      if (title) {
        where = { ...where, title: { contains: title, mode: 'insensitive' } };
      }
    
      if (tags && tags.length > 0) {
        where = { ...where, tags: { hasSome: tags } };
      }
    
      if (authorId) {
        where= {...where,authorId: {contains: userId,mode: 'insensitive'}};
      }
    
      if (startDate && endDate) {
        where = {
          ...where,
          createdAt: {
            gte: startDate.toISOString(),
            lte: endDate.toISOString()
          }
        };
      }
    
      const result = await this.prisma.post.findMany({
        where,
        include: {
          author: true,
          comments: true
        }
      });
    
      return result;

    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async updatePost(id: number,updatePostDto:UpdatepostDto) {
    try {
      const posts = await this.prisma.post.findUnique({
        where: {
          id  : id,
        }
      });
      
      if (!posts) {
        throw new BadRequestException(
          'Post not present',
        );
      }
      const updatedPost = await this.prisma.post.update({
        where: { id:id },
        data: { ...updatePostDto,updatedAt:new Date().toISOString()},
      })
      return updatedPost;
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async deletePost(id: number) {
    try{
      const deleteTeacher = await this.prisma.post.delete({
        where:{
          id:id
        }
      })
      return {success:true}
    }catch(err){
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }

  }
}

