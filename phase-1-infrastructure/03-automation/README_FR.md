# Automatisation de l'Infrastructure

## Description
Cette étape marque la transition vers l'Infrastructure as Code (IaC). Nous utilisons Terraform pour définir et déployer l'infrastructure Azure de manière reproductible et contrôlée.

## Actions Réalisées
1.  Initialisation du projet Terraform (`terraform init`).
2.  Définition des ressources dans les fichiers `.tf` (initialement monolithique ou structure de base).
3.  Exécution du plan de déploiement (`terraform plan`).
4.  Application des changements (`terraform apply`).

## Livrables
*   `main.tf` : Fichier de configuration Terraform principal.
*   `output.log` : Journal d'exécution de la commande `terraform apply` montrant les ressources créées.
