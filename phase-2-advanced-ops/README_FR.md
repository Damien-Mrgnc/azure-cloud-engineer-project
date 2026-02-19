# Phase 2 : Opérations Avancées et Sécurité (Advanced Ops)

## Objectifs
Cette phase marque la transition d'une infrastructure de laboratoire vers une architecture de niveau "Entreprise" (Enterprise-Grade). L'accent est mis sur la refactorisation du code, l'observabilité et le renforcement de la sécurité.

## Architecture Cible
L'infrastructure évolue pour intégrer les meilleures pratiques :
*   **Modularité** : Le code Terraform est découpé par domaines fonctionnels (réseau, calcul, base de données, sécurité).
*   **Observabilité** : Centralisation des logs et surveillance applicative en temps réel via Azure Monitor et Application Insights.
*   **Sécurité** : Implémentation du modèle Zero-Trust avec l'utilisation des Identités Gérées (Managed Identities) pour l'accès aux secrets (Key Vault) et aux bases de données.

## Avancement et Étapes
Cette phase a été réalisée selon une progression structurée :

1.  **Refactoring** : Restructuration du code Terraform monolithique en modules maintenables.
2.  **Observability** : Mise en place de la stack de monitoring (Log Analytics, Application Insights).
3.  **Security Hardening** : Suppression des mots de passe en clair dans le code et transition vers Managed Identity.
4.  **CI/CD** : Mise en place de pipelines de déploiement continu avec GitHub Actions.
5.  **Runtime Deployment** : Déploiement de l'application finale et résolution des problèmes de runtime.

Veuillez consulter les sous-dossiers pour les détails techniques spécifiques à chaque étape.
