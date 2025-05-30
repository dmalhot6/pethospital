provider "aws" {
  region = var.region
}

# Create a random string for unique naming
resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

locals {
  cluster_name = "pethospital-eks-${random_string.suffix.result}"
  suffix       = random_string.suffix.result
}

# VPC Module
module "vpc" {
  source = "./modules/vpc"

  name                 = "pethospital-vpc"
  cidr                 = var.vpc_cidr
  azs                  = var.availability_zones
  private_subnets      = var.private_subnets
  public_subnets       = var.public_subnets
  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    Environment                                   = var.environment
    Project                                       = "pethospital"
  }

  public_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                      = "1"
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"             = "1"
  }
}

# EKS Module
module "eks" {
  source = "./modules/eks"

  cluster_name    = local.cluster_name
  cluster_version = var.kubernetes_version
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  node_groups = {
    main = {
      desired_capacity = var.eks_desired_capacity
      max_capacity     = var.eks_max_capacity
      min_capacity     = var.eks_min_capacity
      instance_types   = var.eks_instance_types
      disk_size        = var.eks_disk_size
    }
  }

  tags = {
    Environment = var.environment
    Project     = "pethospital"
  }
}

# DynamoDB Tables
module "dynamodb" {
  source = "./modules/dynamodb"

  tables = [
    {
      name         = "Pets"
      billing_mode = "PAY_PER_REQUEST"
      hash_key     = "id"
      attributes = [
        {
          name = "id"
          type = "S"
        }
      ]
    },
    {
      name         = "Hospitals"
      billing_mode = "PAY_PER_REQUEST"
      hash_key     = "id"
      attributes = [
        {
          name = "id"
          type = "S"
        }
      ]
    },
    {
      name         = "Doctors"
      billing_mode = "PAY_PER_REQUEST"
      hash_key     = "id"
      attributes = [
        {
          name = "id"
          type = "S"
        }
      ]
    },
    {
      name         = "Visits"
      billing_mode = "PAY_PER_REQUEST"
      hash_key     = "id"
      attributes = [
        {
          name = "id"
          type = "S"
        }
      ]
    },
    {
      name         = "Billing"
      billing_mode = "PAY_PER_REQUEST"
      hash_key     = "id"
      attributes = [
        {
          name = "id"
          type = "S"
        }
      ]
    },
    {
      name         = "Insurance"
      billing_mode = "PAY_PER_REQUEST"
      hash_key     = "id"
      attributes = [
        {
          name = "id"
          type = "S"
        }
      ]
    }
  ]

  tags = {
    Environment = var.environment
    Project     = "pethospital"
  }
}

# ECR Repositories
module "ecr" {
  source = "./modules/ecr"

  repositories = [
    "pet-service",
    "hospital-service",
    "doctor-service",
    "billing-service",
    "insurance-service",
    "visit-service",
    "vet-service",
    "frontend"
  ]

  tags = {
    Environment = var.environment
    Project     = "pethospital"
  }
}

# CloudWatch Monitoring
module "monitoring" {
  source = "./modules/monitoring"

  cluster_name = local.cluster_name
  environment  = var.environment
  
  api_latency_threshold     = var.api_latency_threshold
  error_rate_threshold      = var.error_rate_threshold
  cpu_utilization_threshold = var.cpu_utilization_threshold
  memory_utilization_threshold = var.memory_utilization_threshold
  
  alarm_actions = var.alarm_actions
  ok_actions    = var.ok_actions

  tags = {
    Environment = var.environment
    Project     = "pethospital"
  }
}

# ArgoCD Setup
module "argocd" {
  source = "./modules/argocd"

  cluster_name = local.cluster_name
  environment  = var.environment
  
  tags = {
    Environment = var.environment
    Project     = "pethospital"
  }
}

# Output the cluster endpoint and other important information
output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "cluster_name" {
  description = "Kubernetes Cluster Name"
  value       = local.cluster_name
}

output "ecr_repository_urls" {
  description = "URLs of the created ECR repositories"
  value       = module.ecr.repository_urls
}

output "dynamodb_table_names" {
  description = "Names of the created DynamoDB tables"
  value       = module.dynamodb.table_names
}

output "application_url" {
  description = "URL to access the application"
  value       = module.eks.application_url
}
