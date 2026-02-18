# Observabilité (Azure Monitor)

## 📌 Objectif
Ne plus naviguer "à l'aveugle".
Mettre en place la surveillance complète de l'application et de l'infrastructure.

## 🛠️ Infrastructure Déployée
- **Log Analytics Workspace** (`monitoring.tf`) :
  - Centralisation des logs.
  - Rétention configurée à 30 jours (optimisation des coûts).

- **Application Insights** (`monitoring.tf`) :
  - Monitoring applicatif temps réel.
  - Détection automatique des erreurs 500, latences, dépendances SQL lentes.

- **Intégration App Service** (`compute.tf`) :
  - Clés `APPINSIGHTS_INSTRUMENTATIONKEY` injectées directement dans l'application via Terraform.

## ✅ Résultat
Le tableau de bord Azure affiche maintenant les métriques de trafic, les temps de réponse et les erreurs en direct.

**Commit de référence :** `feat(observability): add Azure Monitor stack`
