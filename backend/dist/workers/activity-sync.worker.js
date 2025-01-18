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
var ActivitySyncWorker_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitySyncWorker = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const strava_service_1 = require("../strava/strava.service");
const prisma_service_1 = require("../prisma/prisma.service");
let ActivitySyncWorker = ActivitySyncWorker_1 = class ActivitySyncWorker extends bullmq_1.WorkerHost {
    stravaService;
    prisma;
    logger = new common_1.Logger(ActivitySyncWorker_1.name);
    constructor(stravaService, prisma) {
        super();
        this.stravaService = stravaService;
        this.prisma = prisma;
    }
    async process(job) {
        this.logger.debug(`Processing activity sync job ${job.id}`);
        const { activityId, athleteId, eventType } = job.data;
        try {
            switch (eventType) {
                case 'create':
                case 'update':
                    await this.handleActivityUpdate(activityId, athleteId);
                    break;
                case 'delete':
                    await this.handleActivityDelete(activityId);
                    break;
            }
        }
        catch (error) {
            this.logger.error(`Failed to process activity sync job ${job.id}:`, error);
            throw error;
        }
    }
    async handleActivityUpdate(activityId, athleteId) {
        const activity = await this.stravaService.getActivity(activityId, athleteId);
        if (!activity) {
            throw new Error(`Activity ${activityId} not found`);
        }
        await this.prisma.activity.upsert({
            where: { stravaId: activityId.toString() },
            update: {
                name: activity.name,
                distance: activity.distance,
                movingTime: activity.moving_time,
                elapsedTime: activity.elapsed_time,
                totalElevationGain: activity.total_elevation_gain,
                type: activity.type,
                startDate: new Date(activity.start_date),
                averageSpeed: activity.average_speed,
                maxSpeed: activity.max_speed,
                averageWatts: activity.average_watts,
                kilojoules: activity.kilojoules,
                averageHeartrate: activity.average_heartrate,
                maxHeartrate: activity.max_heartrate,
            },
            create: {
                stravaId: activityId.toString(),
                userId: athleteId.toString(),
                name: activity.name,
                distance: activity.distance,
                movingTime: activity.moving_time,
                elapsedTime: activity.elapsed_time,
                totalElevationGain: activity.total_elevation_gain,
                type: activity.type,
                startDate: new Date(activity.start_date),
                averageSpeed: activity.average_speed,
                maxSpeed: activity.max_speed,
                averageWatts: activity.average_watts,
                kilojoules: activity.kilojoules,
                averageHeartrate: activity.average_heartrate,
                maxHeartrate: activity.max_heartrate,
            },
        });
    }
    async handleActivityDelete(activityId) {
        await this.prisma.activity.delete({
            where: { stravaId: activityId.toString() },
        });
    }
};
exports.ActivitySyncWorker = ActivitySyncWorker;
exports.ActivitySyncWorker = ActivitySyncWorker = ActivitySyncWorker_1 = __decorate([
    (0, bullmq_1.Processor)('activity-sync'),
    __metadata("design:paramtypes", [strava_service_1.StravaService,
        prisma_service_1.PrismaService])
], ActivitySyncWorker);
