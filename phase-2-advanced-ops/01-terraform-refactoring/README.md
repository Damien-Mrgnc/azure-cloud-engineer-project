# Refactoring Terraform (Modularité)

## 📌 Objectif
Passer d'un fichier `main.tf` unique (monolithique) à une structure de fichiers logiques pour améliorer la maintenance et la lisibilité.

## 🛠️ Actions Réalisées
- **Explosion du monolith** :
  - `network.tf` : VNet, Subnets, NSG.
  - `compute.tf` : App Service Plan, Web App.
  - `database.tf` : SQL Server, Database, Firewall.
  - `security.tf` : Key Vault, Secrets.
  - `main.tf` : (Réduit) Resource Group, Locals.

## ✅ Résultat
Le code est propre, chaque fichier gère un domaine spécifique.
Le test `terraform plan` a confirmé que l'infrastructure Azure n'a pas été modifiée, seul le code a été réorganisé.

**Commit de référence :** `refactor(terraform): split monolith into logical files`
