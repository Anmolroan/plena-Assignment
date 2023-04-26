import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    signin(req: any): Promise<{
        user: import(".prisma/client").User;
        token: string;
    }>;
}
