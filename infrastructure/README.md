# Pet Hospital Infrastructure

This directory contains the Terraform configuration for the Pet Hospital Management System infrastructure.

## Directory Structure

- `main.tf`: Main Terraform configuration file
- `variables.tf`: Variable definitions
- `backend.tf`: Terraform backend configuration
- `environments/`: Environment-specific variable files
  - `terraform.tfvars`: Default variables (dev environment)
  - `prod.tfvars`: Production environment variables
- `modules/`: Terraform modules
  - `vpc/`: VPC configuration
  - `eks/`: EKS cluster configuration
  - `dynamodb/`: DynamoDB tables
  - `ecr/`: ECR repositories
  - `monitoring/`: CloudWatch monitoring
  - `argocd/`: ArgoCD setup

## Getting Started

### Prerequisites

- AWS CLI configured
- Terraform installed
- kubectl installed
- Helm installed

### Setup Terraform State Storage

Before applying the Terraform configuration, you need to set up the S3 bucket and DynamoDB table for remote state:

```bash
# Run with default values (region: us-west-2, prefix: pet-hospital)
./setup-state-storage.sh

# Or specify custom values
./setup-state-storage.sh --region us-east-1 --prefix my-pet-hospital
```

If you use custom values, make sure to update the `backend.tf` file accordingly.

### Applying Terraform Configuration

For development environment:

```bash
terraform init
terraform plan
terraform apply
```

For production environment:

```bash
terraform init
terraform plan -var-file=environments/prod.tfvars
terraform apply -var-file=environments/prod.tfvars
```

### Destroying Infrastructure

For development environment:

```bash
terraform destroy
```

For production environment:

```bash
terraform destroy -var-file=environments/prod.tfvars
```

## Configuration Parameters

All configuration parameters are centralized in the `variables.tf` file and can be overridden in environment-specific `.tfvars` files.

### Key Parameters

- `region`: AWS region to deploy resources
- `environment`: Environment name (dev, staging, prod)
- `project_prefix`: Prefix for all resources created by this project
- `kubernetes_version`: Kubernetes version for the EKS cluster
- `eks_instance_types`: Instance types for EKS worker nodes

See `variables.tf` for a complete list of available parameters.

## Adding New Resources

When adding new resources, make sure to:

1. Use the `local.prefix` variable for resource naming
2. Add appropriate tags including `Environment` and `Project`
3. Use the `local.region` variable for region-specific configurations
4. Update the relevant module's variables if needed
