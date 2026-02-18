# Etape 3 - Automatisation Terraform

## Contexte (ce qu'il fallait creer)
Recreer l'infrastructure de l'etape manuelle avec Terraform (IaC):
- Resource Group
- Reseau (VNet, subnets, NSG)
- Azure SQL (server + database + firewall)
- Key Vault + secret
- App Service Linux (container nginx)

## Actions effectuees
- Ecriture/usage des fichiers Terraform (`providers.tf`, `variables.tf`, `main.tf`, `outputs.tf`).
- Execution Terraform (`init`, `plan`, `apply`) avec outputs valides.
- Reconciliation d'un drift detecte puis recreation des ressources manquantes (App Service Plan / Web App / secret).

## Preuves
- `README_source.md` : description des ressources deployees et commandes executees.
- `output.log` : trace d'execution Terraform (plan/apply + outputs finaux).
