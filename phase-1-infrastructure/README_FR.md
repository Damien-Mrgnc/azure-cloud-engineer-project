# Phase 1 : Infrastructure de Base Azure

## Contexte
Ce dossier marque la première étape du projet Azure Cloud Engineer. Il vise à établir une base solide en passant par une phase d'apprentissage manuel (ClickOps) avant d'automatiser le déploiement.

La méthodologie suivie est la suivante :
1.  **Apprentissage Manuel** : Création des ressources via le Portail Azure pour comprendre les composants.
2.  **Nettoyage** : Suppression des ressources manuelles pour éviter les coûts inutiles.
3.  **Automatisation** : Reconstruction de l'infrastructure en Infrastructure as Code (IaC) avec Terraform.
4.  **Validation** : Vérification du déploiement.

## Structure du Dossier
*   `01-manual-learning` : Traces de la création manuelle et export des configurations.
*   `02-cleanup` : Preuves de la suppression du groupe de ressources initial.
*   `03-automation` : Scripts Terraform initiaux et logs d'exécution.
*   `04-validation` : Tests et validation des composants déployés.

## Portée de l'Infrastructure
Cette phase met en place les fondations suivantes :
*   **Groupe de Ressources** : Conteneur logique pour toutes les ressources.
*   **Réseau (VNet)** : Segmentation réseau avec sous-réseaux et NSG (Network Security Groups).
*   **Base de Données** : Azure SQL Server et Database.
*   **Sécurité** : Azure Key Vault pour la gestion des secrets.
*   **Calcul (Compute)** : Azure App Service Linux (hébergeant une démo initiale Nginx).

## Preuves de Validation
Les journaux d'exécution et les preuves de déploiement sont disponibles dans les sous-dossiers respectifs, notamment `03-automation/output.log` et le rapport de validation dans `04-validation`.
