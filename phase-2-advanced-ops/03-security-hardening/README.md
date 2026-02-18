# Sécurité Hardening (Managed Identity - Zero Trust)

## 📌 Objectif
Éliminer les Mots de Passe en Clair dans le Code (Zero Trust).
Un App Service ne doit plus stocker de mot de passe, il doit "devenir" une identité de sécurité.

## 🛠️ Implémentation
1.  **System Assigned Identity (`compute.tf`)** :
    - Activation de l'identité managée sur l'App Service.
    - Azure crée automatiquement un "Principal" (Service Principal) dans l'Azure AD invisible.

2.  **Key Vault Access Policies (`security.tf`)** :
    - Autorisation explicite donnée à l'identité de l'App Service (`azurerm_key_vault_access_policy`).
    - Droit minimal : `Get`, `List` (uniquement lecture) sur les secrets.
    - Séparation des politiques (`access_policy`) du Key Vault pour éviter les dépendances circulaires.

3.  **Flux** :
    - L'App Service démarre -> S'authentifie à Azure AD -> Demande le secret au Key Vault -> Le Key Vault vérifie l'identité -> Donne le mot de passe SQL.

## ✅ Résultat
Le code de l'application (et Terraform) ne contient plus AUCUN secret DB en clair.
L'accès est **dynamique** et **révocable**.

**Commit de référence :** `feat(security): enable managed identity & key vault access`
