resource "aws_ecr_repository" "this" {
  count = length(var.repositories)

  name                 = var.repositories[count.index]
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = merge(
    {
      Name = var.repositories[count.index]
    },
    var.tags
  )
}

resource "aws_ecr_lifecycle_policy" "this" {
  count = length(var.repositories)

  repository = aws_ecr_repository.this[count.index].name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus     = "any"
          countType     = "imageCountMoreThan"
          countNumber   = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}
