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
var StravaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StravaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const prisma_service_1 = require("../prisma/prisma.service");
let StravaService = StravaService_1 = class StravaService {
    config;
    prisma;
    logger = new common_1.Logger(StravaService_1.name);
    baseUrl = 'https://www.strava.com/api/v3';
    constructor(config, prisma) {
        this.config = config;
        this.prisma = prisma;
    }
    async getActivity(activityId, athleteId) {
        const user = await this.prisma.user.findUnique({
            where: { stravaId: athleteId.toString() },
        });
        if (!user) {
            throw new Error(`User ${athleteId} not found`);
        }
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/activities/${activityId}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response?.status === 401) {
                // Token expired, refresh and retry
                const newToken = await this.refreshToken(user.id);
                const response = await axios_1.default.get(`${this.baseUrl}/activities/${activityId}`, {
                    headers: {
                        Authorization: `Bearer ${newToken}`,
                    },
                });
                return response.data;
            }
            throw error;
        }
    }
    async getSegment(segmentId, athleteId) {
        const user = await this.prisma.user.findUnique({
            where: { stravaId: athleteId.toString() },
        });
        if (!user) {
            throw new Error(`User ${athleteId} not found`);
        }
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/segments/${segmentId}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response?.status === 401) {
                // Token expired, refresh and retry
                const newToken = await this.refreshToken(user.id);
                const response = await axios_1.default.get(`${this.baseUrl}/segments/${segmentId}`, {
                    headers: {
                        Authorization: `Bearer ${newToken}`,
                    },
                });
                return response.data;
            }
            throw error;
        }
    }
    async refreshToken(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || !user.refreshToken) {
            throw new Error('User not found or refresh token missing');
        }
        const response = await axios_1.default.post('https://www.strava.com/oauth/token', {
            client_id: this.config.get('STRAVA_CLIENT_ID'),
            client_secret: this.config.get('STRAVA_CLIENT_SECRET'),
            refresh_token: user.refreshToken,
            grant_type: 'refresh_token',
        });
        const { access_token, refresh_token, expires_at } = response.data;
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                accessToken: access_token,
                refreshToken: refresh_token,
                tokenExpiresAt: new Date(expires_at * 1000),
            },
        });
        return access_token;
    }
};
exports.StravaService = StravaService;
exports.StravaService = StravaService = StravaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], StravaService);
