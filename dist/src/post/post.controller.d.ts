import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostSearchParams } from './entities/postsearch.entity';
import { UpdatepostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(createPostDto: CreatePostDto, req: any): Promise<import(".prisma/client").Post>;
    getPostsByTitle(title: string): Promise<import(".prisma/client").Post[]>;
    searchPost(query: PostSearchParams): Promise<(import(".prisma/client").Post & {
        author: import(".prisma/client").User;
        comments: import(".prisma/client").Comment[];
    })[]>;
    updatePost(id: string, updatePostDto: UpdatepostDto): Promise<import(".prisma/client").Post>;
    deletePost(id: string): Promise<{
        success: boolean;
    }>;
}
