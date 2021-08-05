variable "stage" { default = "dev" }

terraform {
  backend "s3" {
    profile = "default"
    region  = "us-east-1"
    bucket  = "lgtm-generator-backend-tfstates"
    key     = "dev/terraform.tfstate"
  }
}
