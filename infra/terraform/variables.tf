variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "eu-central-1"
}

variable "project_name" {
  description = "Project prefix for resource names."
  type        = string
  default     = "cloud-todo-mvp"
}

variable "app_port" {
  description = "Container port exposed by API service."
  type        = number
  default     = 3000
}

variable "cors_origin" {
  description = "Allowed origin for API CORS."
  type        = string
}

variable "app_image_tag" {
  description = "ECR image tag to deploy to App Runner."
  type        = string
  default     = "latest"
}

variable "db_name" {
  description = "PostgreSQL database name."
  type        = string
  default     = "todo"
}

variable "db_username" {
  description = "PostgreSQL admin username."
  type        = string
  default     = "todo"
}

variable "db_instance_class" {
  description = "RDS instance class for MVP."
  type        = string
  default     = "db.t4g.micro"
}

variable "db_allocated_storage" {
  description = "RDS allocated storage in GB."
  type        = number
  default     = 20
}
