output "repository_urls" {
  description = "URLs of the created ECR repositories"
  value       = aws_ecr_repository.this[*].repository_url
}

output "repository_arns" {
  description = "ARNs of the created ECR repositories"
  value       = aws_ecr_repository.this[*].arn
}
