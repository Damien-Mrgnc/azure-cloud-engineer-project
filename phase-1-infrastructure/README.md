# Projet 1 Azure - Premiere avancee

## Contexte
Ce dossier prepare une **premiere avancee propre pour GitHub** du Projet 1 (Cloud Engineer - Azure).
Le travail suit la logique du guide 1 :
1. apprentissage manuel sur Azure Portal,
2. nettoyage des ressources pour controler les couts,
3. automatisation avec Terraform,
4. preuves de validation.

Objectif de cette publication : montrer clairement **ce qui devait etre cree** et **ce qui a ete effectivement realise**, avec des preuves rangees par etape.

## Structure
- `01-manual-learning` : creation manuelle des ressources Azure + export des ressources.
- `02-cleanup` : suppression du resource group manuel.
- `03-automation` : reconstruction en IaC avec Terraform + log d'execution.
- `04-validation` : validation finale des composants deployes.

## Portee de cette avancee
Cette avancee couvre la fondation infra Azure du projet:
- Resource Group
- VNet + subnets + NSG
- Azure SQL (server + database)
- Key Vault (secret DB)
- App Service Linux (container nginx demo)

## Source des preuves
Les preuves de ce dossier proviennent de:
- `01-manual-learning/Azureresources.csv`
- `02-cleanup/did.txt`
- `03-automation/output.log`
- `03-automation/README.md`
- `04-validation/README.md`
