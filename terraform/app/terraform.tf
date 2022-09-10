terraform {
  required_version = ">= 1.2.9"

  backend "s3" {
    workspace_key_prefix = "workspaces"
    region               = "us-east-1"
    bucket               = "lgtm-generator-tfstates"
    key                  = "terraform.tfstate"
    encrypt              = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.29.0"
    }
  }
}
