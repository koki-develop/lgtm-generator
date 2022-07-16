resource "aws_ecr_lifecycle_policy" "app" {
  repository = "serverless-${local.prefix_backend}"
  policy = jsonencode({
    rules = [
      {
        rulePriority = 1,
        action       = { type = "expire" }
        selection = {
          tagStatus   = "untagged"
          countType   = "sinceImagePushed"
          countUnit   = "days"
          countNumber = 1
        }
      }
    ]
  })
}
