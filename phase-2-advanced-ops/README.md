# Phase 2 - Advanced Ops & Security

Cette phase marque la transition d'une infrastructure "Lab" vers une architecture "Enterprise-Grade".
Nous avons refactorisé le code monolithique, ajouté de l'observabilité et renforcé la sécurité.

## 🏗️ Architecture Cible
- **Modularité** : Code découpé par domaine (`network`, `compute`, `database`, `security`).
- **Observabilité** : Logs centralisés et monitoring applicatif temps réel.
- **Sécurité** : Zero-Trust (Managed Identity) pour l'accès aux secrets.

## 📅 Avancement
Cette phase a été réalisée en plusieurs commits structurés :

1.  **Refactoring** (Découpage du code)
2.  **Observability** (Monitoring Stack)
3.  **Security Hardening** (Managed Identity)
4.  **CI/CD** (GitHub Actions - *À venir*)

---
*Voir les sous-dossiers pour les détails techniques de chaque étape.*
