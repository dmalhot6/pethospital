variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

# VPC Variables
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

variable "private_subnets" {
  description = "List of private subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "public_subnets" {
  description = "List of public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}

# EKS Variables
variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.28"
}

variable "eks_desired_capacity" {
  description = "Desired number of worker nodes"
  type        = number
  default     = 2
}

variable "eks_max_capacity" {
  description = "Maximum number of worker nodes"
  type        = number
  default     = 5
}

variable "eks_min_capacity" {
  description = "Minimum number of worker nodes"
  type        = number
  default     = 2
}

variable "eks_instance_types" {
  description = "List of instance types for the EKS nodes"
  type        = list(string)
  default     = ["t3.medium"]
}

variable "eks_disk_size" {
  description = "Disk size in GB for worker nodes"
  type        = number
  default     = 50
}

# Monitoring Variables
variable "api_latency_threshold" {
  description = "Threshold for API latency alarm in milliseconds"
  type        = number
  default     = 1000 # 1 second
}

variable "error_rate_threshold" {
  description = "Threshold for error rate alarm in percentage"
  type        = number
  default     = 5 # 5%
}

variable "cpu_utilization_threshold" {
  description = "Threshold for CPU utilization alarm in percentage"
  type        = number
  default     = 80 # 80%
}

variable "memory_utilization_threshold" {
  description = "Threshold for memory utilization alarm in percentage"
  type        = number
  default     = 80 # 80%
}

variable "alarm_actions" {
  description = "List of ARNs to notify when alarm transitions to ALARM state"
  type        = list(string)
  default     = []
}

variable "ok_actions" {
  description = "List of ARNs to notify when alarm transitions to OK state"
  type        = list(string)
  default     = []
}
