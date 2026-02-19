# Terraform Refactoring

## Description
This step aims to improve the maintainability and scalability of the infrastructure code by splitting the monolithic `main.tf` file into specialized modules.

## changes Made
1.  Separation of `main.tf` into specific files:
    *   `network.tf`: Configuration of VNet, Subnets, and NSG.
    *   `compute.tf`: Configuration of App Service Plan and App Service.
    *   `database.tf`: Configuration of SQL Server and Database.
    *   `security.tf`: Configuration of Key Vault and access policies.
    *   `variables.tf` and `outputs.tf`: Centralization of variables and outputs.

## Purpose
This structure allows for easier management of complex infrastructures and facilitates team collaboration.
