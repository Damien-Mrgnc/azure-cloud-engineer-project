const prisma = require('../config/database');
const logger = require('../config/logger');

// Récupérer la config actuelle (avec valeurs par défaut si vide)
async function getConfig() {
    // Liste des clés attendues
    const keys = ['siteTitle', 'siteDescription', 'maintenanceMode', 'theme'];

    // Chercher en DB
    const configs = await prisma.appConfig.findMany({
        where: { keyName: { in: keys } },
    });

    // Mapper résultat DB vers objet simple
    const defaultConfig = {
        siteTitle: 'Default Title',
        siteDescription: 'Default Description',
        maintenanceMode: false,
        theme: 'light',
    };

    const result = { ...defaultConfig };

    configs.forEach((c) => {
        if (c.value === 'true' || c.value === 'false') {
            result[c.keyName] = c.value === 'true';
        } else {
            result[c.keyName] = c.value;
        }
    });

    return result;
}

// Mettre à jour la config (Transaction + Audit)
async function updateConfig(newConfig, changedBy = 'system', correlationId) {
    logger.info(`Updating config by ${changedBy}`, { newConfig, correlationId });

    // 1. Lire état existant pour Audit (oldValue)
    const existingRecords = await prisma.appConfig.findMany({
        where: { keyName: { in: Object.keys(newConfig) } }
    });

    const existingMap = new Map();
    existingRecords.forEach(r => existingMap.set(r.keyName, r.value));

    const operations = [];

    for (const [key, val] of Object.entries(newConfig)) {
        const stringVal = String(val);
        const oldVal = existingMap.get(key);

        // Si pas de changement, on skip (optimisation)
        if (oldVal === stringVal) continue;

        // Opération Update/Upsert Config
        operations.push(
            prisma.appConfig.upsert({
                where: { keyName: key },
                update: { value: stringVal, updatedBy: changedBy },
                create: { keyName: key, value: stringVal, updatedBy: changedBy }
            })
        );

        // Opération Insert Audit
        operations.push(
            prisma.appConfigAudit.create({
                data: {
                    keyName: key,
                    oldValue: oldVal,
                    newValue: stringVal,
                    changedBy: changedBy,
                    correlationId: correlationId || 'unknown'
                }
            })
        );
    }

    if (operations.length > 0) {
        // Exécution atomique
        await prisma.$transaction(operations);
        logger.info(`Configuration updated successfully (${operations.length / 2} keys changed)`, { correlationId });
    } else {
        logger.info('No changes detected in configuration update', { correlationId });
    }

    return getConfig(); // Retourne état frais
}

// Récupérer l'historique des modifications
async function getAuditLogs() {
    return await prisma.appConfigAudit.findMany({
        orderBy: { changedAt: 'desc' },
        take: 50
    });
}

module.exports = {
    getConfig,
    updateConfig,
    getAuditLogs
};
