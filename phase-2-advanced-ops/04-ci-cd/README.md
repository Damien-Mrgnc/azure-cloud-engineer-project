# CI/CD Pipeline (GitHub Actions)

## Description
This step implements a Continuous Integration and Continuous Deployment (CI/CD) pipeline to automate the building and deployment of the application.

## Pipeline Workflow
1.  **Build**: Compilation of the Node.js application and creation of the Docker image.
2.  **Push**: Sending the image to the Azure Container Registry (ACR).
3.  **Infrastructure**: Validation of Terraform code (`plan` / `apply`) (optional depending on workflow configuration).
4.  **Deploy**: Updating the App Service to use the new Docker image.

## Security
*   Use of **OpenID Connect (OIDC)** to authenticate GitHub Actions with Azure without storing long-lived secrets.

## Deliverables
*   `.github/workflows/deploy.yml`: Workflow definition file.
