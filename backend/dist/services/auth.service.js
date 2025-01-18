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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async findUserByStravaId(stravaId) {
        return this.prisma.user.findUnique({
            where: { stravaId },
        });
    }
    async upsertUser(athlete) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                stravaId: athlete.id.toString(),
            },
        });
        if (existingUser) {
            return this.prisma.user.update({
                where: {
                    stravaId: athlete.id.toString(),
                },
                data: {
                    name: athlete.name,
                    email: athlete.email,
                    accessToken: athlete.access_token,
                    refreshToken: athlete.refresh_token,
                    tokenExpiresAt: new Date(athlete.expires_at * 1000),
                },
            });
        }
        return this.prisma.user.create({
            data: {
                stravaId: athlete.id.toString(),
                name: athlete.name,
                email: athlete.email,
                accessToken: athlete.access_token,
                refreshToken: athlete.refresh_token,
                tokenExpiresAt: new Date(athlete.expires_at * 1000),
            },
        });
    }
    async generateToken(user) {
        const payload = { userId: user.id };
        return this.jwtService.sign(payload);
    }
    async validateUser(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }
    async refreshToken(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return this.generateToken(user);
    }
    async updateUserWeight(userId, weight) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { weight },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
