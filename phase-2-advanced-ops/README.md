# Phase 2: Advanced Ops & Security

## Objectives
This phase marks the transition from a laboratory infrastructure to an "Enterprise-Grade" architecture. The focus is on code refactoring, observability, and security hardening.

## Target Architecture
The infrastructure evolves to incorporate best practices:
*   **Modularity**: Terraform code is split by functional domains (network, compute, database, security).
*   **Observability**: Centralized logs and real-time application monitoring via Azure Monitor and Application Insights.
*   **Security**: Implementation of the Zero-Trust model using Managed Identities for access to secrets (Key Vault) and databases.

## Progress and Steps
This phase was executed following a structured progression:

1.  **Refactoring**: Restructuring monolithic Terraform code into maintainable modules.
2.  **Observability**: Setting up the monitoring stack (Log Analytics, Application Insights).
3.  **Security Hardening**: Removing cleartext passwords from code and transitioning to Managed Identity.
4.  **CI/CD**: Setting up continuous deployment pipelines with GitHub Actions.
5.  **Runtime Deployment**: Deploying the final application and troubleshooting runtime issues.

Please refer to the subfolders for specific technical details regarding each step.
