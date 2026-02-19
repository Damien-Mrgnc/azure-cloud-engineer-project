# Phase 1: Basic Azure Infrastructure

## Context
This folder represents the first milestone of the Azure Cloud Engineer project. The goal is to establish a solid foundation by starting with manual learning (ClickOps) before transitioning to automated deployment.

The methodology followed is:
1.  **Manual Learning**: Creating resources via the Azure Portal to understand the components.
2.  **Cleanup**: Deleting manual resources to avoid unnecessary costs.
3.  **Automation**: Rebuilding the infrastructure using Infrastructure as Code (IaC) with Terraform.
4.  **Validation**: Verifying the deployment.

## Folder Structure
*   `01-manual-learning`: Records of manual creation and configuration exports.
*   `02-cleanup`: Proof of deletion of the initial resource group.
*   `03-automation`: Initial Terraform scripts and execution logs.
*   `04-validation`: Tests and validation of deployed components.

## Infrastructure Scope
This phase establishes the following foundations:
*   **Resource Group**: Logical container for all project resources.
*   **Network (VNet)**: Network segmentation with subnets and NSGs (Network Security Groups).
*   **Database**: Azure SQL Server and Database.
*   **Security**: Azure Key Vault for secret management.
*   **Compute**: Linux Azure App Service (hosting an initial Nginx demo).

## Validation Proofs
Execution logs and deployment proofs are available in the respective subfolders, specifically `03-automation/output.log` and the validation report in `04-validation`.
