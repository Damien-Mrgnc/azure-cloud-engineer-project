# Mise en Place de l'Observabilité

## Description
Cette étape intègre des solutions de monitoring et de logging pour garantir la visibilité sur la performance et la santé de l'infrastructure et de l'application.

## Composants Implémentés
1.  **Log Analytics Workspace** : Entrepôt central pour les logs de toutes les ressources.
2.  **Application Insights** : Service APM (Application Performance Management) pour l'application web (trace HTTP, erreurs, performance).
3.  **Diagnostic Settings** : Configuration automatique pour envoyer les logs de plateforme (SQL, App Service) vers Log Analytics.

## Livrables
*   `monitoring.tf` : Fichier Terraform définissant les ressources de monitoring.
