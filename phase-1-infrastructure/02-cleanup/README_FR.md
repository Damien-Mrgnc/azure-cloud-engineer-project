# Nettoyage des Ressources

## Description
Après la phase d'apprentissage manuel, il est crucial de supprimer les ressources créées manuellement. Cela garantit que la phase d'automatisation démarre sur un état propre (clean state) et évite de générer des coûts inutiles pour des ressources de test.

## Actions Réalisées
1.  Identification du Resource Group manuel.
2.  Suppression du Resource Group via Azure CLI ou le Portail.
3.  Vérification que toutes les ressources associées ont bien été supprimées.

## Livrables
*   `did.txt` : Journal de confirmation de l'opération de nettoyage.
