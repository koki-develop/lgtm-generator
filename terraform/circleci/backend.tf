terraform {
  backend "s3" {
    region  = "us-east-1"
    bucket  = "lgtm-generator-tfstates"
    key     = "circleci/terraform.tfstate"
    encrypt = true
  }
}
