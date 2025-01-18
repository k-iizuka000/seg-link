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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const bullmq_2 = require("@nestjs/bullmq");
let WebhookService = class WebhookService {
    activitySyncQueue;
    constructor(activitySyncQueue) {
        this.activitySyncQueue = activitySyncQueue;
    }
    async handleStravaEvent(event) {
        if (event.object_type === 'activity') {
            await this.handleActivityEvent(event);
        }
    }
    async handleActivityEvent(event) {
        const jobData = {
            activityId: event.object_id,
            athleteId: event.owner_id,
            eventType: event.aspect_type,
            updates: event.updates,
        };
        const jobOptions = {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000,
            },
        };
        await this.activitySyncQueue.add('sync-activity', jobData, jobOptions);
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_2.InjectQueue)('activity-sync')),
    __metadata("design:paramtypes", [bullmq_1.Queue])
], WebhookService);
