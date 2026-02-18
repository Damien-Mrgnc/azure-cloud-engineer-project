const logger = require('../config/logger');

// App Service décode/passe les infos dans des headers X-MS-CLIENT-PRINCIPAL-...
// Ce middleware lit ces headers pour reconstruire l'identité.
// Si on veut être strict en LOCAL (sans Azure), on peut simuler via des .vars ou bypass.

function requireAuth(req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        // Mock en dev pour éviter la complexité EasyAuth locale
        req.user = {
            name: 'dev-admin',
            roles: ['AppAdmin']
        };
        return next();
    }

    const principalId = req.headers['x-ms-client-principal-id'];
    const principalName = req.headers['x-ms-client-principal-name'];
    const principalEncoded = req.headers['x-ms-client-principal'];

    if (!principalId && !principalName) {
        logger.warn('Unauthorized access attempt (missing x-ms-client headers)');
        return res.status(401).send('Unauthorized. Please ensure App Service Authentication is enabled.');
    }

    try {
        let userRoles = [];
        if (principalEncoded) {
            const buffer = Buffer.from(principalEncoded, 'base64');
            const decoded = JSON.parse(buffer.toString('utf-8'));
            // decoded.claims contient les roles si configurés dans l'App Registration
            // Mais souvent avec EasyAuth simple, on a juste l'identité.
            // On va assumer ici que tout utilisateur authentifié AAD de l'org est "User".
            userRoles = decoded.user_roles || []; // Dépend de la config EasyAuth
        }

        req.user = {
            id: principalId,
            name: principalName,
            roles: userRoles // À mapper selon la configuration réelle
        };

        next();
    } catch (e) {
        logger.error('Error decoding principal', e);
        res.status(403).send('Forbidden (Invalid Token)');
    }
}

function requireAdmin(req, res, next) {
    // Dans ce POC simple, on demande juste d'être authentifié pour l'admin.
    // Pour aller plus loin, on vérifierait req.user.roles.includes('AppAdmin').
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }
    // TODO: Implémenter la logique RBAC réelle si besoin
    next();
}

module.exports = { requireAuth, requireAdmin };
