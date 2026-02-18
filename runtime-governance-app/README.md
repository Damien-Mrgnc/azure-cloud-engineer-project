# Runtime Governance App

Application de gouvernance dynamique en Node.js 20 + Express + Prisma + Azure SQL.
Permet de modifier le comportement du site via une interface Admin sans redéploiement, avec audit trail.

## Fonctionnalités
- Affichage dynamique du titre, description, thème, mode maintenance.
- API Admin protégée (x-ms-client-principal).
- Stockage SQL Server Azure avec MI (Managed Identity).
- Secrets Key Vault (pour strings connexion App Insights etc.).
- Logging JSON structuré pour Azure Monitor.

## Structure
- `src/api` : Routes REST
- `src/services` : Logique métier (Config, KeyVault)
- `src/middleware` : Auth, Logs
- `src/views` : UI (SSR EJS)
- `prisma` : Schéma DB SQL Server

## Prérequis Azure
- Azure App Service (Linux Container)
- Azure SQL Database
- Azure Key Vault
- Managed Identity activée sur l'App Service
- Rôle `Key Vault Secrets User` sur l'identité
- Rôle DB (ou utilisateur contenu) sur la base SQL

## Local Dev (Docker)
1. Copier `.env.example` vers `.env`
2. `docker-compose up -d db` (si SQL local)
3. `npm install`
4. `npx prisma migrate dev`
5. `npm run dev`

## Déploiement Azure
Cette application est conçue pour être déployée via GitHub Actions :
1. Build Docker -> ACR
2. Deploy -> App Service

### Variables d'environnement App Service
- `DATABASE_URL` : Chaîne de connexion SQL Server (MSI integrated)
- `KEY_VAULT_URL` : `https://<vault-name>.vault.azure.net/`
- `NODE_ENV` : `production`
- `PORT` : `8080` (Par défaut)

## Authentification
L'application s'attend à être protégée par **Azure App Service Authentication (EasyAuth)**.
Elle lit les headers `x-ms-client-principal` pour identifier l'utilisateur.

## API
- `GET /api/config` : Config publique
- `POST /api/admin/config` : Update config (Admin only)
