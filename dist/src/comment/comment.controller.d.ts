import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createPost(createCommentDto: CreateCommentDto, req: any): Promise<import(".prisma/client").Comment>;
    getPosts(query: {
        postId: string;
    }): Promise<import(".prisma/client").Comment[]>;
    deletePost(id: string): Promise<{
        success: boolean;
    }>;
}
