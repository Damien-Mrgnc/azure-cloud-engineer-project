const { PrismaClient } = require('@prisma/client');
const logger = require('./logger');

// Prisma utilisera par défaut DATABASE_URL de l'environnement.
// Dans Azure, cette variable sera injectée via App Settings (Terraform).
// Format attendu pour Managed Identity :
// sqlserver://server.database.windows.net:1433;database=db;authenticationType=azure-active-directory-msi;encrypt=true

const prisma = new PrismaClient({
    log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
    ],
});

prisma.$on('query', (e) => {
    if (process.env.NODE_ENV !== 'production') {
        logger.debug('Query: ' + e.query);
        logger.debug('Duration: ' + e.duration + 'ms');
    }
});


module.exports = prisma;
