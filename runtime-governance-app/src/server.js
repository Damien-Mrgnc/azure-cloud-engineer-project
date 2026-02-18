const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./config/logger');
const apiRoutes = require('./api/routes');
const { requireAuth, requireAdmin } = require('./middleware/auth');
const configService = require('./services/configService');

const app = express();
const port = process.env.PORT || 8080;

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(cors());

// Routes API Publiques (Public config)
// GET /api/config -> Retourne l'état actuel
app.get('/api/config', async (req, res) => {
    try {
        const config = await configService.getConfig();
        res.json(config);
    } catch (e) {
        logger.error('Failed to get config API', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Admin API (Protégé)
// POST /api/admin/config
const { configUpdateSchema } = require('./validation/configSchema');

app.post('/api/admin/config', requireAuth, requireAdmin, async (req, res) => {
    try {
        // Validation Zod
        const validatedPayload = configUpdateSchema.parse(req.body);

        // Update DB
        const result = await configService.updateConfig(
            validatedPayload,
            req.user.name || 'Admin',
            req.correlationId
        );

        res.json({ message: 'Success', config: result });
    } catch (e) {
        if (e.errors) { // Zod Error
            return res.status(400).json({ message: 'Validation Error', errors: e.errors });
        }
        logger.error('Update failed', e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Routes UI
app.get('/', async (req, res) => {
    // Page Publique : Rendue côté serveur avec la config actuelle
    try {
        const config = await configService.getConfig();
        res.render('index', { config });
    } catch (e) {
        logger.error('Failed to render index', e);
        res.status(500).send('Error loading page');
    }
});

app.get('/admin', requireAuth, requireAdmin, async (req, res) => {
    try {
        const config = await configService.getConfig();
        res.render('admin', { config, error: null });
    } catch (e) {
        logger.error('Failed to render admin', e);
        res.status(500).send('Error loading admin panel');
    }
});

// Route Audit Log (Admin)
app.get('/admin/audit', requireAuth, requireAdmin, async (req, res) => {
    try {
        const config = await configService.getConfig();
        const logs = await configService.getAuditLogs();
        res.render('audit', { config, logs });
    } catch (e) {
        logger.error('Failed to render audit log', e);
        res.status(500).send('Error loading audit log');
    }
});

// Lancement Serveur
app.listen(port, () => {
    logger.info(`Runtime Governance App listening on port ${port}`);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Closing...');
    // Fermeture propre DB etc.
    process.exit(0);
});
