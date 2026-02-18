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

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    "WEBSITES_PORT"                         = "80"
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.main.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.main.connection_string
  }

  tags = local.tags
}
