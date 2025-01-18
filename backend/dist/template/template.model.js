"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateSchema = void 0;
const zod_1 = require("zod");
exports.TemplateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1),
    clothing: zod_1.z.string(),
    wheels: zod_1.z.string(),
    wind: zod_1.z.string(),
    weight: zod_1.z.number(),
    notes: zod_1.z.string().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
