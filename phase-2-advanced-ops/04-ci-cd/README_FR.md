# Pipeline CI/CD (GitHub Actions)

## Description
Cette étape met en œuvre un pipeline d'Intégration Continue et de Déploiement Continu (CI/CD) pour automatiser la construction et le déploiement de l'application.

## Workflow du Pipeline
1.  **Build** : Compilation de l'application Node.js et création de l'image Docker.
2.  **Push** : Envoi de l'image vers l'Azure Container Registry (ACR).
3.  **Infrastructure** : Validation du code Terraform (`plan` / `apply`) (selon configuration du workflow).
4.  **Deploy** : Mise à jour de l'App Service pour utiliser la nouvelle image Docker.

## Sécurité
*   Utilisation d'**OpenID Connect (OIDC)** pour authentifier GitHub Actions auprès d'Azure sans stocker de secrets à longue durée de vie.

## Livrables
*   `.github/workflows/deploy.yml` : Fichier de définition du workflow.
