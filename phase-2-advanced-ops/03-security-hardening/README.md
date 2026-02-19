# Security Hardening (Zero Trust)

## Description
This step reinforces security by eliminating cleartext secrets (passwords, connection strings) from the code and configuration files, adopting a "Zero Trust" approach based on identity.

## Actions Performed
1.  **Managed Identity (MSI)**: Enabling System Assigned Identity on the App Service.
2.  **Key Vault Integration**: Granting the App Service access to Key Vault secrets via access policies, without managing credentials.
3.  **SQL Authentication**: Configuring the application to connect to Azure SQL using its managed identity.
4.  **Network Security**: Validating NSG rules to restrict traffic to necessary ports only.

## Purpose
To reduce the risk of credential leakage and simplify secret rotation.
