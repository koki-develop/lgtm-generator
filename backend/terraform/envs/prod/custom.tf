variable "stage" { default = "prod" }

terraform {
  backend "s3" {
    profile = "default"
    region  = "us-east-1"
    bucket  = "lgtm-generator-backend-tfstates"
    key     = "prod/terraform.tfstate"
  }
}
