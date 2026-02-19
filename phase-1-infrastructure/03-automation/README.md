# Infrastructure Automation

## Description
This step marks the transition to Infrastructure as Code (IaC). We use Terraform to define and deploy the Azure infrastructure in a reproducible and controlled manner.

## Actions Performed
1.  Initialization of the Terraform project (`terraform init`).
2.  Definition of resources in `.tf` files (initially monolithic or basic structure).
3.  Execution of the deployment plan (`terraform plan`).
4.  Application of changes (`terraform apply`).

## Deliverables
*   `main.tf`: Main Terraform configuration file.
*   `output.log`: Execution log of the `terraform apply` command showing the created resources.
