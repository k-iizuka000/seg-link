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
exports.SegmentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let SegmentController = class SegmentController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(query) {
        const { clothing, wheels, wind, weight } = query;
        const segments = await this.prisma.segment.findMany({
            where: {
                activities: {
                    some: {
                        clothing: clothing || undefined,
                        wheels: wheels || undefined,
                        wind: wind || undefined,
                        weight: weight || undefined,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                distance: true,
                averageGrade: true,
                maximumGrade: true,
                elevationDifference: true,
                activities: {
                    where: {
                        clothing: clothing || undefined,
                        wheels: wheels || undefined,
                        wind: wind || undefined,
                        weight: weight || undefined,
                    },
                    select: {
                        clothing: true,
                        wheels: true,
                        wind: true,
                        weight: true,
                    },
                    take: 1,
                },
            },
        });
        return segments.map((segment) => ({
            id: segment.id,
            name: segment.name,
            distance: segment.distance,
            averageGrade: segment.averageGrade,
            maximumGrade: segment.maximumGrade,
            elevationDifference: segment.elevationDifference,
            clothing: segment.activities[0]?.clothing,
            wheels: segment.activities[0]?.wheels,
            wind: segment.activities[0]?.wind,
            weight: segment.activities[0]?.weight,
        }));
    }
};
exports.SegmentController = SegmentController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SegmentController.prototype, "search", null);
exports.SegmentController = SegmentController = __decorate([
    (0, common_1.Controller)('segments'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SegmentController);
