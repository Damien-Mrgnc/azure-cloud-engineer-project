# Étape 04 - Pipeline CI/CD Automatisé (GitHub Actions)

## Objectif
Automatiser le déploiement de l'infrastructure via **GitHub Actions**, en remplaçant l'exécution locale de Terraform. L'objectif est d'atteindre un niveau professionnel de **Continuous Integration / Continuous Deployment (CI/CD)** avec une sécurité maximale.

## Architecture du Pipeline
Le workflow (`.github/workflows/deploy.yml`) suit les meilleures pratiques DevOps :

1.  **Authentification OIDC (OpenID Connect)** :
    *   Pas de secrets (Client Secret) stockés dans GitHub.
    *   Utilisation d'une **Identité Fédérée** entre GitHub et Azure AD.
    *   Sécurité renforcée et rotation automatique des tokens.

2.  **Remote State Management** :
    *   Le fichier d'état Terraform (`terraform.tfstate`) n'est plus local.
    *   Il est stocké de manière sécurisée et verrouillée dans un **Azure Storage Account** (`sttfstate...`).
    *   Permet le travail collaboratif et la persistance de l'état entre les runs CI/CD.

3.  **Gestion Dynamique des accès Key Vault** :
    *   Problème résolu : Le Service Principal de GitHub Actions n'a pas accès par défaut aux secrets du Key Vault.
    *   Solution implémentée : Un script de **Pre-Authorization** s'exécute avant Terraform.
    *   Il utilise Azure CLI pour s'autoriser lui-même temporairement (`set-policy`) sur le Key Vault, permettant à Terraform de lire les secrets sans erreur `403 Forbidden`.

## Workflow
Le pipeline se déclenche à chaque **Push** sur la branche `main` modifiant le dossier `terraform/`.

### Jobs
1.  **Terraform Plan** :
    *   Checkout du code.
    *   Login Azure (OIDC).
    *   **Pre-Authorize KeyVault** (Script d'auto-permission).
    *   `terraform init` (Backend Azure).
    *   `terraform plan` (Affiche les changements prévus).

2.  **Terraform Apply** (si le Plan réussit) :
    *   Mêmes étapes d'initialisation et d'autorisation.
    *   `terraform apply -auto-approve` : Applique réellement les changements sur Azure.

## Preuve de fonctionnement
- Le workflow est visible dans l'onglet **Actions** du repository GitHub.
- Chaque commit sur l'infrastructure déclenche un pipeline traçable et auditable.
- L'infrastructure est désormais **Immuable** et pilotée par le code (GitOps).
