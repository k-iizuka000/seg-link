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
exports.StravaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let StravaService = class StravaService {
    configService;
    clientId;
    clientSecret;
    redirectUri;
    constructor(configService) {
        this.configService = configService;
        this.clientId = this.configService.get('STRAVA_CLIENT_ID');
        this.clientSecret = this.configService.get('STRAVA_CLIENT_SECRET');
        this.redirectUri = this.configService.get('STRAVA_REDIRECT_URI');
    }
    async getAuthorizationUrl() {
        const scope = 'read,activity:read_all';
        return `https://www.strava.com/oauth/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${scope}`;
    }
    async exchangeToken(code) {
        const response = await axios_1.default.post('https://www.strava.com/oauth/token', {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code,
            grant_type: 'authorization_code',
        });
        return response.data;
    }
    async refreshToken(refreshToken) {
        const response = await axios_1.default.post('https://www.strava.com/oauth/token', {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        });
        return response.data;
    }
    async getActivity(accessToken, activityId) {
        const response = await axios_1.default.get(`https://www.strava.com/api/v3/activities/${activityId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
};
exports.StravaService = StravaService;
exports.StravaService = StravaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StravaService);
