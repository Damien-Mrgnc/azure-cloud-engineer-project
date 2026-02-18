# Git Workflow & Commit Strategy

Ce document définit la stratégie de commits pour passer du **Projet 1 (Fondation)** au **Projet 2 (Avancé)** de manière professionnelle.

## 📅 Roadmap des Commits

### 1️⃣ Commit Un (Actuel) : Phase 1 - Foundation
**Objectif :** Figer l'infrastructure de base fonctionnelle.
- **Contenu :**
  - Réseau (VNet, Subnets, NSG)
  - Database (Azure SQL Basic)
  - Compute (App Service Linux)
  - Security (Key Vault avec secrets générés)
  - Documentation de preuves (Phase 1)
- **Tag :** `v1.0.0-foundation`

### 2️⃣ Commit Deux : Refactoring (Guide 2)
**Objectif :** Nettoyer le code Terraform avant de le complexifier.
- **Action :** Découper `main.tf` en modules ou fichiers séparés.
- **Fichiers :** `network.tf`, `database.tf`, `compute.tf`, `security.tf`.

### 3️⃣ Commit Trois : Observability
**Objectif :** Ajouter la couche de monitoring.
- **Action :** Ajouter Log Analytics et Application Insights.
- **Fichiers :** `monitoring.tf`.

### 4️⃣ Commit Quatre : Security Hardening
**Objectif :** Supprimer les mots de passe et utiliser les identités gérées.
- **Action :** Configurer Managed Identity pour l'App Service -> Key Vault.
- **Note :** C'est une étape clé pour passer "Senior".

### 5️⃣ Commit Cinq : CI/CD Pipeline
**Objectif :** Automatiser le déploiement via GitHub Actions.
- **Fichiers :** `.github/workflows/infra-deploy.yml`.

---

## 🌳 Structure du Projet (Cible)

```text
Projet1-Cloud Engineer/
├── .github/                # Workflows CI/CD
├── phase-1-infrastructure/ # Documentation & Preuves Phase 1
├── terraform/              # Infrastructure as Code
│   ├── modules/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── GIT_FLOW.md             # Ce fichier
```
