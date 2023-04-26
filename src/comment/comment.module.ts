import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaService } from 'prisma/prisma.service';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService,PrismaService,RabbitMQService]
})
export class CommentModule {}
