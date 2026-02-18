# Projet 1 Azure - Plan de réalisation et bilan de la première avancée

## Pourquoi ce document
Ce fichier est la lecture principale du dépôt pour comprendre le projet sans naviguer dans plusieurs sous-dossiers.
Il explique simplement ce que nous avons voulu construire, ce qui a été fait concrètement, les preuves disponibles, et ce qui viendra ensuite.

## 1. Contexte du projet
Ce projet est la première brique d'un fil rouge Cloud/DevSecOps/SRE.
L'objectif de cette phase est de poser une fondation d'infrastructure Azure propre, reproductible, et économique.

La logique suivie est volontairement progressive :
1. Comprendre Azure en créant manuellement.
2. Nettoyer pour éviter les coûts inutiles.
3. Automatiser exactement la même base avec Terraform.
4. Valider et documenter les preuves.

## 2. Objectif technique de cette première avancée
Le périmètre couvert dans cette version est :
- Resource Group pour regrouper l'infrastructure.
- Réseau de base (VNet, subnets, NSG).
- Base de données managée Azure SQL.
- Gestion des secrets dans Key Vault.
- Compute via App Service Linux déployant un conteneur Docker public (`nginxdemos/hello`).

En clair : on met en place une architecture Azure minimale mais réaliste, déjà alignée avec de bonnes pratiques (segmentation réseau, secret management, infrastructure as code).

## 3. Architecture visée (version de départ)
- Un Resource Group dédié au projet.
- Un VNet avec séparation public/privé.
- Un NSG pour limiter les flux entrants (HTTP/HTTPS côté public).
- Un SQL Server + SQL Database en service managé.
- Un Key Vault pour sortir les secrets du code.
- Un App Service Linux qui exécute une image Docker de démonstration.

Cette architecture reste volontairement simple pour un premier jalon, mais elle prépare les étapes suivantes (sécurité renforcée, observabilité, CI/CD).

## 4. Déroulé réel des travaux

### Étape 1 - Apprentissage manuel 
But : comprendre les formulaires Azure et les dépendances entre services.

Ce qui a été fait :
- Création manuelle des ressources principales dans Azure Portal.
- Vérification visuelle et fonctionnelle des composants.
- Export d'un inventaire de ressources pour garder une trace factuelle.

Preuve associée :
- `01-manual-learning/Azureresources.csv`

### Étape 2 - Nettoyage (Cost control)
But : ne pas laisser de ressources actives après la phase de test manuel.

Ce qui a été fait :
- Suppression du Resource Group de la phase manuelle.
- Validation écrite de l'action de nettoyage.


### Étape 3 - Automatisation Terraform
But : reconstruire l'infrastructure via code, de manière reproductible.

Ce qui a été fait :
- Utilisation des fichiers Terraform (`providers.tf`, `variables.tf`, `main.tf`, `outputs.tf`).
- Exécution de `terraform init`, `terraform plan`, `terraform apply`.
- Déploiement du socle Azure (réseau, DB, KV, App Service).
- Gestion d'un cas réel de dérive (ressources supprimées hors Terraform), puis recréation correcte lors du nouvel apply.

Preuves associées :
- `03-automation/output.log`
- `03-automation/README.md`

### Étape 4 - Preuves et finitions
But : confirmer que l'infrastructure est exploitable et documentée.

Ce qui a été fait :
- Vérification de l'accessibilité de l'application web.
- Vérification des composants SQL et Key Vault.
- Formalisation de la preuve de fin de jalon.

Preuve associée :
- `04-validation/README.md`

## 5. Résultat de cette première avancée
À ce stade, le projet dispose :
- D'un parcours complet manuel -> nettoyage -> automatisation.
- D'une infrastructure Terraform fonctionnelle et rejouable.
- D'un dossier de preuves par étape.
- D'une base sérieuse pour la suite du fil rouge.

Ce dépôt n'est donc pas une simple maquette : c'est un premier incrément projet avec traçabilité.

## 6. Décisions de conception et justification
- Terraform a été retenu pour la reproductibilité et la lisibilité des changements.
- Key Vault a été utilisé pour éviter les secrets en dur.
- Le plan App Service et la base SQL sont positionnés sur des choix orientés lab/coût maîtrisé.
- Le découpage par étapes permet une lecture pédagogique et un audit simple de ce qui a été réellement réalisé.


## 7. Comment lire ce dépôt rapidement
Si tu découvres le projet :
1. Lis ce `Plan.md`.
2. Vérifie les preuves de chaque étape dans les dossiers `0*-*`.
3. Consulte ensuite le dossier Terraform pour le détail d'implémentation.
