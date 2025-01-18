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
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const webhook_service_1 = require("./webhook.service");
let WebhookController = class WebhookController {
    webhookService;
    config;
    constructor(webhookService, config) {
        this.webhookService = webhookService;
        this.config = config;
    }
    async verifyWebhook(mode, token, challenge) {
        if (mode === 'subscribe' && token === this.config.get('STRAVA_WEBHOOK_VERIFY_TOKEN')) {
            return { 'hub.challenge': challenge };
        }
        throw new Error('Invalid webhook verification request');
    }
    async handleWebhook(subscriptionId, event) {
        await this.webhookService.handleStravaEvent(event);
        return { status: 'ok' };
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Get)('strava'),
    __param(0, (0, common_1.Query)('hub.mode')),
    __param(1, (0, common_1.Query)('hub.verify_token')),
    __param(2, (0, common_1.Query)('hub.challenge')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "verifyWebhook", null);
__decorate([
    (0, common_1.Post)('strava'),
    __param(0, (0, common_1.Headers)('x-strava-webhook-subscription-id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handleWebhook", null);
exports.WebhookController = WebhookController = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService,
        config_1.ConfigService])
], WebhookController);
