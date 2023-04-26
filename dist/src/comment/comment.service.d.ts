import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'prisma/prisma.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
export declare class CommentService {
    private prisma;
    private rabbitmqService;
    constructor(prisma: PrismaService, rabbitmqService: RabbitMQService);
    createComment(createCommentDto: CreateCommentDto, user_id: number): Promise<import(".prisma/client").Comment>;
    getComments(id: number): Promise<import(".prisma/client").Comment[]>;
    deleteComment(id: number): Promise<{
        success: boolean;
    }>;
}
