output "ecr_repository_url" {
  description = "ECR repository URL for API image pushes."
  value       = aws_ecr_repository.api.repository_url
}

output "apprunner_service_url" {
  description = "Public URL of App Runner service."
  value       = aws_apprunner_service.api.service_url
}

output "rds_endpoint" {
  description = "RDS endpoint hostname."
  value       = aws_db_instance.todo.address
}

output "database_url_secret_arn" {
  description = "Secrets Manager ARN holding DATABASE_URL."
  value       = aws_secretsmanager_secret.database_url.arn
}

output "frontend_bucket_name" {
  description = "S3 bucket name for frontend static assets."
  value       = aws_s3_bucket.frontend.id
}

output "frontend_cloudfront_domain" {
  description = "CloudFront distribution domain for frontend."
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "frontend_cloudfront_distribution_id" {
  description = "CloudFront distribution ID for cache invalidation."
  value       = aws_cloudfront_distribution.frontend.id
}

output "apprunner_service_arn" {
  description = "App Runner service ARN for CI deployment."
  value       = aws_apprunner_service.api.arn
}
