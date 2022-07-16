module "aws" {
  source = "./modules/aws"
  providers = {
    aws = aws
  }

  stage = terraform.workspace
}
