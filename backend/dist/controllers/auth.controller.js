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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const strava_service_1 = require("../services/strava.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AuthController = class AuthController {
    authService;
    stravaService;
    constructor(authService, stravaService) {
        this.authService = authService;
        this.stravaService = stravaService;
    }
    async getStravaAuthUrl() {
        const url = await this.stravaService.getAuthorizationUrl();
        return { url };
    }
    async handleStravaCallback(code) {
        try {
            const tokenData = await this.stravaService.exchangeToken(code);
            const user = await this.authService.upsertUser(tokenData.athlete);
            const jwt = await this.authService.generateToken(user);
            return {
                token: jwt,
            };
        }
        catch (error) {
            console.error('Failed to handle Strava callback:', error);
            throw error;
        }
    }
    async getStravaStatus(req) {
        const user = await this.authService.validateUser(req.user.id);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            connected: true,
            lastSync: user.tokenExpiresAt,
            activityCount: 0, // TODO: 実際のアクティビティ数を取得
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('strava'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getStravaAuthUrl", null);
__decorate([
    (0, common_1.Get)('strava/callback'),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleStravaCallback", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('strava/status'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getStravaStatus", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        strava_service_1.StravaService])
], AuthController);
