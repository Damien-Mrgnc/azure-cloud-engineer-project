# Refactorisation Terraform

## Description
Cette étape vise à améliorer la maintenabilité et l'évolutivité du code d'infrastructure en découpant le fichier monolithique `main.tf` en modules spécialisés.

## Changements Apportés
1.  Séparation du `main.tf` en fichiers spécifiques :
    *   `network.tf` : Configuration du VNet, Subnets et NSG.
    *   `compute.tf` : Configuration de l'App Service Plan et App Service.
    *   `database.tf` : Configuration du SQL Server et de la Database.
    *   `security.tf` : Configuration du Key Vault et des politiques d'accès.
    *   `variables.tf` et `outputs.tf` : Centralisation des variables et des sorties.

## Objectif
Cette structure permet une gestion plus aisée des infrastructures complexes et facilite la collaboration en équipe.
