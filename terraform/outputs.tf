output "resource_group_name" {
  description = "Name of the created Resource Group"
  value       = azurerm_resource_group.main.name
}

output "web_app_url" {
  description = "Main URL of the deployed Web App"
  value       = "https://${azurerm_linux_web_app.main.default_hostname}"
}

output "sql_server_fqdn" {
  description = "Fully Qualified Domain Name of the SQL Server"
  value       = azurerm_mssql_server.main.fully_qualified_domain_name
}

output "key_vault_name" {
  description = "Name of the Key Vault storing secrets"
  value       = azurerm_key_vault.main.name
}

# Pour debug/dev uniquement - Ne jamais outputter les secrets en clair en Prod !
output "sql_admin_password_secret_id" {
  description = "ID of the Key Vault Secret containing the SQL password"
  value       = azurerm_key_vault_secret.sql_password.id
}
