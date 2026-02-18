# Etape 1 - Apprentissage manuel

## Contexte (ce qu'il fallait creer)
Creation manuelle via Azure Portal dans `proj1-manuel-rg`:
- VNet `proj1-vnet`
- Azure SQL (serveur + database)
- App Service for Containers (image `nginxdemos/hello`)
- Key Vault avec secret `DbPassword`

## Actions effectuees
- Ressources creees manuellement et validees dans Azure.
- Export de la liste des ressources creees pour garder une preuve traçable.

## Preuves
- `Azureresources.csv` : inventaire exporte des ressources du Resource Group manuel.
