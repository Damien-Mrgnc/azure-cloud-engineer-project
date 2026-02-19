# Resource Cleanup

## Description
After the manual learning phase, it is crucial to delete the manually created resources. This ensures that the automation phase starts from a clean state and avoids incurring unnecessary costs for test resources.

## Actions Performed
1.  Identification of the manual Resource Group.
2.  Deletion of the Resource Group via Azure CLI or Portal.
3.  Verification that all associated resources have been removed.

## Deliverables
*   `did.txt`: Confirmation log of the cleanup operation.
