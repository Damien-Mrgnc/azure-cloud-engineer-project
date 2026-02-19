# Renforcement de la Sécurité (Zero Trust)

## Description
Cette étape renforce la sécurité en éliminant les secrets en clair (mots de passe, chaînes de connexion) du code et des fichiers de configuration, en adoptant une approche "Zero Trust" basée sur l'identité.

## Actions Réalisées
1.  **Managed Identity (MSI)** : Activation de l'identité système sur l'App Service.
2.  **Intégration Key Vault** : Octroi de l'accès à l'App Service pour lire les secrets du Key Vault via des politiques d'accès, sans gérer d'identifiants.
3.  **Authentification SQL** : Configuration de l'application pour se connecter à Azure SQL en utilisant son identité gérée.
4.  **Sécurité Réseau** : Validation des règles NSG pour restreindre le trafic aux seuls ports nécessaires.

## Objectif
Réduire les risques de fuite d'identifiants et simplifier la rotation des secrets.
