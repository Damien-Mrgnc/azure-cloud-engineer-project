const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
const logger = require('../config/logger');

// URL du Key Vault depuis les variables d'environnement
const vaultUrl = process.env.KEY_VAULT_URL;

let client;

if (vaultUrl) {
    try {
        // Managed Identity en premier, puis environnement (local dev)
        const credential = new DefaultAzureCredential();
        client = new SecretClient(vaultUrl, credential);
        logger.info(`KeyVault client initialized for ${vaultUrl}`);
    } catch (error) {
        logger.error("Failed to initialize KeyVault client", { error: error.message });
    }
} else {
    logger.warn("KEY_VAULT_URL not set. Secrets will fail.");
}

async function getSecret(secretName) {
    if (!client) {
        throw new Error("KeyVault not configured");
    }
    try {
        const secret = await client.getSecret(secretName);
        return secret.value;
    } catch (error) {
        logger.error(`Error retrieving secret ${secretName}`, { error: error.message });
        throw error;
    }
}

module.exports = { getSecret };
