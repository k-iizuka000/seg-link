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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleStravaCallback(code) {
        const tokenResponse = await this.getStravaToken(code);
        const { athlete } = tokenResponse;
        const existingUser = await this.prisma.user.findUnique({
            where: { stravaId: athlete.id.toString() },
        });
        if (existingUser) {
            const user = await this.prisma.user.update({
                where: { id: existingUser.id },
                data: {
                    accessToken: tokenResponse.access_token,
                    refreshToken: tokenResponse.refresh_token,
                    tokenExpiresAt: new Date(tokenResponse.expires_at * 1000),
                },
            });
            return user;
        }
        const user = await this.prisma.user.create({
            data: {
                stravaId: athlete.id.toString(),
                name: `${athlete.firstname} ${athlete.lastname}`,
                email: athlete.email,
                accessToken: tokenResponse.access_token,
                refreshToken: tokenResponse.refresh_token,
                tokenExpiresAt: new Date(tokenResponse.expires_at * 1000),
            },
        });
        return user;
    }
    async getStravaToken(code) {
        const response = await fetch('https://www.strava.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.STRAVA_CLIENT_ID,
                client_secret: process.env.STRAVA_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to get Strava token');
        }
        return response.json();
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
