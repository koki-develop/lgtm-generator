module "aws" {
  source = "./modules/aws"

  stage = terraform.workspace
}
