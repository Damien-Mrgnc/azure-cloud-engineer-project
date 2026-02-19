# Azure Cloud Engineer Project

## Overview
This project is a complete and professional implementation of a cloud infrastructure on Microsoft Azure. It demonstrates advanced skills in cloud engineering, covering Infrastructure as Code (IaC), Continuous Deployment (CI/CD), Security (Zero Trust), and cloud-native application development.

The goal is to provide a "Production Ready", secure, modular, and fully automated solution.

## Architecture

```text
      +-------------+
      |   End User  |
      +------+------+
             | HTTPS
             v
+----------------------------------------------------+
|                   Azure Cloud                      |
|                                                    |
|    +---------------+        +------------------+   |
|    |  App Service  +-------->  Azure SQL DB    |   |
|    |   (Node.js)   |  TDS   | (Managed Ident.) |   |
|    +-------+-------+        +------------------+   |
|            |       |                               |
|       Pull |       +--------Get Secret (MI)        |      
|      Image |                        |              |
|            v                        v              |
|    +-------+-------+        +------------------+   |
|    |     A C R     |        |  Azure Key Vault |   |
|    +---------------+        +------------------+   |
|                                                    |
+----------------------------------------------------+
```

## Project Structure

The project is organized into several key components. Please refer to the `README.md` files in each folder for more details.

### [Phase 1: Basic Infrastructure](phase-1-infrastructure/README.md)
*   Setting up foundations via Azure Portal (learning) then automation.
*   Creation of Resource Group, VNet, and core services.

### [Phase 2: Advanced Operations](phase-2-advanced-ops/README.md)
*   Refactoring Terraform code for modularity.
*   Implementing observability (Logs, App Insights).
*   Security hardening (Managed Identities, removing cleartext secrets).
*   Setting up Continuous Integration and Deployment (CI/CD).

### [Application Source Code](runtime-governance-app/README.md)
*   Node.js "Runtime Governance" application hosted on Azure App Service.
*   Demonstrates the use of Azure SDKs and managed identities.

### [Infrastructure as Code (Terraform)](terraform/README.md)
*   All Terraform manifests defining the infrastructure.
*   Modules for network, compute, database, and security.

## Technologies Used
*   **Cloud Provider**: Microsoft Azure
*   **Infrastructure**: Terraform
*   **CI/CD**: GitHub Actions
*   **Application**: Node.js, Express, Docker
*   **Database**: Azure SQL Database
*   **Security**: Azure Key Vault, Managed Identities
*   **Monitoring**: Azure Monitor, Application Insights

## Disclaimer
Certain sensitive configuration files (`.tfvars`, local state files, private keys) are excluded from the repository via `.gitignore` for security reasons.
