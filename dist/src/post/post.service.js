"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PostService = class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPost(createPostDto, user_id) {
        try {
            const uniqueRecords = await this.prisma.post.findMany({
                where: {
                    title: {
                        contains: createPostDto.title,
                        mode: 'insensitive',
                    },
                },
            });
            if (uniqueRecords.length) {
                throw new common_1.HttpException("title is already created", common_1.HttpStatus.CONFLICT);
            }
            const post = await this.prisma.post.create({
                data: Object.assign(Object.assign({}, createPostDto), { authorId: user_id, commentCount: 0, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() }),
            });
            return post;
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getPosts(id) {
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
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getPostsByTitle(title) {
        try {
            const posts = await this.prisma.post.findMany({
                where: {
                    title: {
                        contains: title,
                        mode: 'insensitive',
                    },
                },
            });
            return posts;
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async searchPost(query) {
        try {
            const { title, tags, authorId, startDate, endDate } = query;
            const userId = +authorId;
            let where = {};
            if (title) {
                where = Object.assign(Object.assign({}, where), { title: { contains: title, mode: 'insensitive' } });
            }
            if (tags && tags.length > 0) {
                where = Object.assign(Object.assign({}, where), { tags: { hasSome: tags } });
            }
            if (authorId) {
                where = Object.assign(Object.assign({}, where), { authorId: { contains: userId, mode: 'insensitive' } });
            }
            if (startDate && endDate) {
                where = Object.assign(Object.assign({}, where), { createdAt: {
                        gte: startDate.toISOString(),
                        lte: endDate.toISOString()
                    } });
            }
            const result = await this.prisma.post.findMany({
                where,
                include: {
                    author: true,
                    comments: true
                }
            });
            return result;
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async updatePost(id, updatePostDto) {
        try {
            const posts = await this.prisma.post.findUnique({
                where: {
                    id: id,
                }
            });
            if (!posts) {
                throw new common_1.BadRequestException('Post not present');
            }
            const updatedPost = await this.prisma.post.update({
                where: { id: id },
                data: Object.assign(Object.assign({}, updatePostDto), { updatedAt: new Date().toISOString() }),
            });
            return updatedPost;
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async deletePost(id) {
        try {
            const deleteTeacher = await this.prisma.post.delete({
                where: {
                    id: id
                }
            });
            return { success: true };
        }
        catch (err) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map