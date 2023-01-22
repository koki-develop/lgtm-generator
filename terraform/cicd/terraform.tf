terraform {
  backend "s3" {
    region  = "us-east-1"
    bucket  = "lgtm-generator-tfstates"
    key     = "cicd/terraform.tfstate"
    encrypt = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.50.0"
    }
  }
}
