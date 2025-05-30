# Pet Hospital Management System

A comprehensive pet hospital management system built with microservices architecture running on Amazon EKS.

## Architecture

This project implements a microservices architecture with the following components:

- **Backend Services**:
  - Pet Service: Manage pet information
  - Hospital Service: Manage hospital information
  - Doctor Service: Manage doctor information
  - Billing Service: Handle billing operations
  - Insurance Service: Manage pet insurance
  - Visit Service: Track pet visits
  - Vet Service: Manage veterinarian information

- **Frontend**: React-based UI for the application

- **Infrastructure**: AWS resources managed with Terraform
  - Amazon EKS for Kubernetes orchestration
  - Amazon RDS for databases
  - Amazon CloudWatch for monitoring and alerting
  - AWS Application Load Balancer for traffic routing

- **CI/CD**: GitOps workflow using GitHub Actions and ArgoCD

## Getting Started

### Prerequisites

- AWS CLI configured
- kubectl installed
- Terraform installed
- Docker installed

### Deployment

The application is deployed automatically via GitHub Actions workflows:

1. Push changes to the `main` branch to trigger infrastructure and application deployment
2. The GitHub workflow will:
   - Apply Terraform configurations
   - Build and push Docker images
   - Deploy to EKS using ArgoCD

### Cleanup

To remove all AWS resources:

1. Go to the GitHub Actions tab
2. Run the "Terraform Destroy" workflow manually

## Monitoring

The application is monitored using AWS CloudWatch with alerts for:
- Service health
- API latency
- Error rates

## Development

Follow the standard GitOps workflow:
1. Create a feature branch
2. Make changes
3. Submit a pull request
4. After approval and merge, changes will be automatically deployed
