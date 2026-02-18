const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Format JSON obligatoire pour Azure
    ),
    defaultMeta: { service: 'runtime-governance-app' },
    transports: [
        new winston.transports.Console() // Tout va vers stdout (capturé par Azure)
    ],
});

module.exports = logger;
