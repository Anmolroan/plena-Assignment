import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostSearchParams } from './entities/postsearch.entity';
import { UpdatepostDto } from './dto/update-post.dto';
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    createPost(createPostDto: CreatePostDto, user_id: number): Promise<import(".prisma/client").Post>;
    getPosts(id: number): Promise<import(".prisma/client").Post[]>;
    getPostsByTitle(title: string): Promise<import(".prisma/client").Post[]>;
    searchPost(query: PostSearchParams): Promise<(import(".prisma/client").Post & {
        author: import(".prisma/client").User;
        comments: import(".prisma/client").Comment[];
    })[]>;
    updatePost(id: number, updatePostDto: UpdatepostDto): Promise<import(".prisma/client").Post>;
    deletePost(id: number): Promise<{
        success: boolean;
    }>;
}
