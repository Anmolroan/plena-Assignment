import { Response } from 'express';
import { UserService } from './user.services';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    signin(req: LoginUserDto, response: Response): Promise<{
        user: import(".prisma/client").User;
        token: string;
    }>;
}
