"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    server: {
        port: process.env.PORT || 3000,
        nodeEnv: process.env.NODE_ENV || 'development',
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    redis: {
        url: process.env.REDIS_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-jwt-secret',
        expiresIn: '1d',
    },
    strava: {
        clientId: process.env.STRAVA_CLIENT_ID,
        clientSecret: process.env.STRAVA_CLIENT_SECRET,
        webhookVerifyToken: process.env.STRAVA_WEBHOOK_VERIFY_TOKEN,
        redirectUri: process.env.NODE_ENV === 'production'
            ? 'https://your-domain.com/auth/callback'
            : 'http://localhost:3000/auth/callback',
    },
};
