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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const rabbitmq_service_1 = require("../rabbitmq/rabbitmq.service");
let CommentService = class CommentService {
    constructor(prisma, rabbitmqService) {
        this.prisma = prisma;
        this.rabbitmqService = rabbitmqService;
    }
    async createComment(createCommentDto, user_id) {
        try {
            const comment = await this.prisma.comment.create({
                data: Object.assign(Object.assign({}, createCommentDto), { authorId: user_id, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() }),
            });
            const postId = createCommentDto.postId;
            const post = await this.prisma.post.update({
                where: { id: postId },
                data: {
                    commentCount: { increment: 1 },
                },
            });
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
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async getComments(id) {
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
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async deleteComment(id) {
        try {
            const deletedComment = await this.prisma.comment.delete({
                where: {
                    id: id
                }
            });
            const post = await this.prisma.post.update({
                where: { id: deletedComment.postId },
                data: {
                    commentCount: { decrement: 1 },
                },
            });
            const message = JSON.stringify({
                type: 'comment_deleted',
                payload: {
                    postId: deletedComment.postId,
                    id: deletedComment.id,
                    commentCount: post.commentCount,
                },
            });
            this.rabbitmqService.publish('post', 'comment.deleted', message);
            return { success: true };
        }
        catch (err) {
            throw new common_1.HttpException('comment not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, rabbitmq_service_1.RabbitMQService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map