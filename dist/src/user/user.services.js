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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt = require("jsonwebtoken");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { username } = createUserDto;
        try {
            const uniqueRecords = await this.prisma.user.findMany({
                where: {
                    username: username,
                },
                distinct: ['username'],
            });
            console.log(uniqueRecords);
            if (uniqueRecords.length > 0) {
                throw new common_1.HttpException('User is already present for the specific class', common_1.HttpStatus.CONFLICT);
            }
            const _a = await this.prisma.user.create({
                data: Object.assign(Object.assign({}, createUserDto), { updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() }),
            }), { password } = _a, restProps = __rest(_a, ["password"]);
            return restProps;
        }
        catch (err) {
            throw new common_1.HttpException(err.response, err.status);
        }
    }
    async signin(req) {
        const { username, password } = req;
        const user = await this.prisma.user.findMany({
            where: {
                username: username,
                password: password,
            },
        });
        if (!user) {
            throw new common_1.HttpException('Teacher not found', common_1.HttpStatus.NOT_FOUND);
        }
        const token = jwt.sign({ user_id: user[0].id }, process.env.JWT_SECRET);
        return { user: user[0], token };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map