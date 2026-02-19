# Observability Implementation

## Description
This step integrates monitoring and logging solutions to ensure visibility into the performance and health of the infrastructure and application.

## Implemented Components
1.  **Log Analytics Workspace**: Central repository for logs from all resources.
2.  **Application Insights**: Application Performance Management (APM) service for the web app (HTTP trace, errors, performance).
3.  **Diagnostic Settings**: Automatic configuration to send platform logs (SQL, App Service) to Log Analytics.

## Deliverables
*   `monitoring.tf`: Terraform file defining monitoring resources.
