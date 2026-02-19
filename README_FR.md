# Projet Azure Cloud Engineer

## Vue d'Ensemble
Ce projet est une implémentation complète et professionnelle d'une infrastructure cloud sur Microsoft Azure. Il démontre des compétences avancées en ingénierie cloud, couvrant l'Infrastructure as Code (IaC), le déploiement continu (CI/CD), la sécurité (Zero Trust) et le développement d'applications cloud-native.

L'objectif est de fournir une solution "Production Ready", sécurisée, modulaire et entièrement automatisée.

## Architecture

```text
      +-------------+
      |   End User  |
      +------+------+
             | HTTPS
             v
+----------------------------------------------------+
|                   Azure Cloud                      |
|                                                    |
|    +---------------+        +------------------+   |
|    |  App Service  +-------->  Azure SQL DB    |   |
|    |   (Node.js)   |  TDS   | (Managed Ident.) |   |
|    +-------+-------+        +------------------+   |
|            |       |                               |
|       Pull |       +---------- Get Secret (MI)     |
|      Image |                          |            |
|            v                          v            |
|    +-------+-------+        +------------------+   |
|    |     A C R     |        |  Azure Key Vault |   |
|    +---------------+        +------------------+   |
|                                                    |
+----------------------------------------------------+
```

## Structure du Projet

Le projet est organisé en plusieurs composants clés. Veuillez consulter les fichiers `README.md` dans chaque dossier pour plus de détails.

### [Phase 1 : Infrastructure de Base](phase-1-infrastructure/README_FR.md)
*   Mise en place des fondations via le Portail Azure (apprentissage) puis automatisation.
*   Création du Resource Group, VNet, et des services de base.

### [Phase 2 : Opérations Avancées](phase-2-advanced-ops/README_FR.md)
*   Refactorisation du code Terraform pour la modularité.
*   Implémentation de l'observabilité (Logs, App Insights).
*   Renforcement de la sécurité (Managed Identities, suppression des secrets en clair).
*   Mise en place de l'intégration et du déploiement continu (CI/CD).

### [Code Source de l'Application](runtime-governance-app/README_FR.md)
*   Application Node.js "Runtime Governance" hébergée sur Azure App Service.
*   Démontre l'utilisation des SDKs Azure et des identités gérées.

### [Infrastructure as Code (Terraform)](terraform/README_FR.md)
*   Ensemble des manifestes Terraform définissant l'infrastructure.
*   Modules pour le réseau, le calcul, la base de données et la sécurité.

## Technologies Utilisées
*   **Cloud Provider** : Microsoft Azure
*   **Infrastructure** : Terraform
*   **CI/CD** : GitHub Actions
*   **Application** : Node.js, Express, Docker
*   **Base de Données** : Azure SQL Database
*   **Sécurité** : Azure Key Vault, Managed Identities
*   **Monitoring** : Azure Monitor, Application Insights

## Avertissement
Certains fichiers de configuration sensible (`.tfvars`, fichiers d'état locaux, clés privées) sont exclus du référentiel via `.gitignore` pour des raisons de sécurité.
