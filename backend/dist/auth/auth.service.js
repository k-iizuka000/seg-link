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
const prisma_service_1 = require("src/prisma/prisma.service");
const axios_1 = __importDefault(require("axios"));
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    encryptToken(token) {
        // TODO: Implement proper encryption using environment secret
        return Buffer.from(token).toString('base64');
    }
    decryptToken(encryptedToken) {
        // TODO: Implement proper decryption using environment secret
        return Buffer.from(encryptedToken, 'base64').toString('utf-8');
    }
    async storeStravaTokens(userId, accessToken, refreshToken) {
        const encryptedAccessToken = this.encryptToken(accessToken);
        const encryptedRefreshToken = this.encryptToken(refreshToken);
        return await this.prisma.stravaAuth.upsert({
            where: { userId },
            update: {
                accessToken: encryptedAccessToken,
                refreshToken: encryptedRefreshToken,
                expiresAt: new Date(Date.now() + 21600 * 1000), // 6 hours
            },
            create: {
                userId,
                accessToken: encryptedAccessToken,
                refreshToken: encryptedRefreshToken,
                expiresAt: new Date(Date.now() + 21600 * 1000), // 6 hours
                athleteId: 0, // Will be updated after first API call
                premium: false,
                summit: false,
                createdAtStrava: new Date(),
                updatedAtStrava: new Date(),
                badgeTypeId: 0,
            },
        });
    }
    async getStravaTokens(userId) {
        const stravaAuth = await this.prisma.stravaAuth.findUnique({
            where: { userId },
            select: {
                accessToken: true,
                refreshToken: true,
            },
        });
        return stravaAuth;
    }
    async refreshStravaToken(userId) {
        const stravaAuth = await this.prisma.stravaAuth.findUnique({
            where: { userId },
            select: {
                refreshToken: true,
            },
        });
        if (!stravaAuth || !stravaAuth.refreshToken) {
            throw new Error('Refresh token not found');
        }
        const decryptedRefreshToken = this.decryptToken(stravaAuth.refreshToken);
        // TODO: Implement actual Strava API call to refresh token
        const newTokens = {
            access_token: 'new_access_token',
            refresh_token: 'new_refresh_token',
            expires_in: 21600,
        };
        await this.storeStravaTokens(userId, newTokens.access_token, newTokens.refresh_token);
        return {
            accessToken: newTokens.access_token,
            refreshToken: newTokens.refresh_token,
            expiresIn: newTokens.expires_in,
        };
    }
    async validateStravaToken(token) {
        // TODO: Implement actual Strava API call to validate token
        // For now, just check if token exists and is not empty
        if (!token || token.trim().length === 0) {
            throw new Error('Invalid token');
        }
        return true;
    }
    async exchangeStravaCode(code) {
        const response = await axios_1.default.post('https://www.strava.com/oauth/token', null, {
            params: {
                client_id: process.env.STRAVA_CLIENT_ID,
                client_secret: process.env.STRAVA_CLIENT_SECRET,
                code: code,
                grant_type: 'authorization_code'
            }
        });
        const { access_token, refresh_token, athlete } = response.data;
        // Store tokens in the database
        await this.storeStravaTokens(athlete.id.toString(), access_token, refresh_token);
        return { access_token, refresh_token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
