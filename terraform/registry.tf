# ---
# 6. Container Registry (ACR)
# ---

resource "azurerm_container_registry" "main" {
  name                = "acr${var.project_name}${random_id.server_suffix.hex}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true # Useful for local debugging / admin user

  tags = local.tags
}

# ---
# Role Assignment: Allow App Service to Pull Images
# ---
resource "azurerm_role_assignment" "aks_pull" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_linux_web_app.main.identity[0].principal_id
}
