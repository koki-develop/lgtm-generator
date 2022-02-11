terraform {
  backend "s3" {
    profile              = "default"
    workspace_key_prefix = "workspaces"
    region               = "us-east-1"
    bucket               = "lgtm-generator-backend-tfstates"
    key                  = "terraform.tfstate"
  }
}

module "aws" {
  source = "./modules/aws"
  stage  = terraform.workspace
}
