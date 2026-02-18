# Local variables for resource naming convention
locals {
  resource_group_name = "rg-${var.project_name}-${var.environment}"
  location            = var.location
  tags                = var.tags
}

# ---
# 1. Resource Group
# ---
resource "azurerm_resource_group" "main" {
  name     = local.resource_group_name
  location = local.location
  tags     = local.tags
}

# ---
# 2. Networking (VNet + Subnets + NSG)
# ---
resource "azurerm_virtual_network" "main" {
  name                = "vnet-${var.project_name}-${var.environment}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  address_space       = ["10.0.0.0/16"]
  tags                = local.tags
}

resource "azurerm_subnet" "public" {
  name                 = "snet-public"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet" "private" {
  name                 = "snet-private"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
}

# Security Group (NSG) - Best Practice pour sécuriser le subnet public
resource "azurerm_network_security_group" "public_nsg" {
  name                = "nsg-${var.project_name}-public"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "AllowHTTP"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "AllowHTTPS"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = local.tags
}

resource "azurerm_subnet_network_security_group_association" "public" {
  subnet_id                 = azurerm_subnet.public.id
  network_security_group_id = azurerm_network_security_group.public_nsg.id
}

# ---
# 3. Database (Azure SQL)
# ---
resource "random_password" "sql_admin" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "random_id" "server_suffix" {
  byte_length = 4
}

resource "azurerm_mssql_server" "main" {
  name                         = "sql-${var.project_name}-${random_id.server_suffix.hex}"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_login
  administrator_login_password = random_password.sql_admin.result
  minimum_tls_version          = "1.2" # Best Practice Security

  tags = local.tags
}

resource "azurerm_mssql_database" "main" {
  name        = "sqldb-${var.project_name}"
  server_id   = azurerm_mssql_server.main.id
  sku_name    = var.db_sku_name
  max_size_gb = 2

  # Prevent accidental deletion of production data
  # lifecycle {
  #   prevent_destroy = true 
  # }

  tags = local.tags
}

resource "azurerm_mssql_firewall_rule" "allow_azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0" # "Allow Azure Services" magic IP
}

# ---
# 4. Key Vault (Secrets Management)
# ---
data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "main" {
  name                        = "kv-${var.project_name}-${random_id.server_suffix.hex}"
  location                    = azurerm_resource_group.main.location
  resource_group_name         = azurerm_resource_group.main.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false # Lab setup: allow quick purge

  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions     = ["Get"]
    secret_permissions  = ["Get", "List", "Set", "Delete", "Recover", "Backup", "Restore", "Purge"]
    storage_permissions = ["Get"]
  }

  tags = local.tags
}

resource "azurerm_key_vault_secret" "sql_password" {
  name         = "sql-admin-password"
  value        = random_password.sql_admin.result
  key_vault_id = azurerm_key_vault.main.id

  tags = local.tags
}

# ---
# 5. Compute (App Service)
# ---
resource "azurerm_service_plan" "main" {
  name                = "asp-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku

  tags = local.tags
}

resource "azurerm_linux_web_app" "main" {
  name                = "app-${var.project_name}-${random_id.server_suffix.hex}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.main.location
  service_plan_id     = azurerm_service_plan.main.id

  site_config {
    application_stack {
      docker_image_name   = "nginxdemos/hello:latest"
      docker_registry_url = "https://index.docker.io"
    }
    always_on = false # Required for F1/D1 tiers
  }

  app_settings = {
    "WEBSITES_PORT" = "80"
  }

  tags = local.tags
}
